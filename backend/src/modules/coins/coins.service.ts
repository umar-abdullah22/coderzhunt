import { TransactionActionTypes } from './../../../libs/types/src/db/entities/subscriptions';
import { GlobalResponseDto } from '../../../libs/dtos/src/common';
import { CreateAnnouncementRequestDto } from '../../../libs/dtos/src/announcement/create';

import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateActionTypeDto, CreateGiftDto, SetCostDto, UpdateGiftDto } from '../../../libs/dtos/src';
import { UserTransactionActionTypes } from '../user/entities/user.transaction.actiontypes.entity';
import { AuthHelper } from '../auth/auth.helper';
import { UserRoleEnum } from '../../../libs/types/src';
import * as fs from 'fs';
import * as path from 'path';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { clearConfigCache } from 'prettier';
@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserTransactionActionTypes)
    private readonly actionTypeRepository: Repository<UserTransactionActionTypes>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
    private cloudinary: CloudinaryConfigService
  ) {}

  public async findAll(): Promise<UserTransactionActionTypes[]> {
    return await this.actionTypeRepository.find();
  }

  public async findOne(id: string) {
    const coins = await this.actionTypeRepository.findOneBy({ id });
    if (!coins) {
      throw new HttpException('Coins not found!', HttpStatus.NOT_FOUND);
    }
    return coins;
  }

  async setCost(token: string, setCostDto: SetCostDto) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (user == null) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (user.role === UserRoleEnum.ADMIN) {
      const updatedActionTypes = [];

      for (const actionTypeCost of setCostDto.actionTypeCosts) {
        const actionType = await this.actionTypeRepository.findOne({
          where: {
            id: actionTypeCost.id,
          },
        });

        if (!actionType) {
          throw new HttpException('Action type not found', HttpStatus.NOT_FOUND);
        }

        actionType.cost = actionTypeCost.cost;
        actionType.adminId = user.id;
        await this.actionTypeRepository.save(actionType);
        updatedActionTypes.push(actionType);
      }

      return updatedActionTypes;
    } else {
      throw new HttpException('Must be an Admin!', HttpStatus.FORBIDDEN);
    }
  }

  async createActionType(token: string, createActionTypeDto: CreateActionTypeDto) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string); // verify access token and get user from db
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (user == null) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (user.role === UserRoleEnum.ADMIN) {
      const exists = await this.actionTypeRepository.findOne({
        where: { actionType: createActionTypeDto.actionType },
      });

      if (exists) {
        throw new HttpException('Action type already exists', HttpStatus.CONFLICT);
      }
      const newActionType = this.actionTypeRepository.create({ ...createActionTypeDto, adminId: user.id });
      await this.actionTypeRepository.save(newActionType);
      return newActionType;
    } else {
      throw new HttpException('Must be an Admin!', HttpStatus.FORBIDDEN);
    }
  }

  public async findAllGifts(): Promise<UserTransactionActionTypes[]> {
    const types = await this.actionTypeRepository.find({ where: { gift: true } });
    return types;
  }

  public async findGiftById(id: string) {
    const gift = await this.actionTypeRepository.findOneBy({ id, gift: true });
    if (!gift) {
      throw new HttpException('Gift not found!', HttpStatus.NOT_FOUND);
    }
    const imageData = fs.readFileSync(gift?.imageUrl);
    const base64Data = imageData?.toString('base64');
    gift.imageUrl = base64Data;
    return gift;
  }

  async createGift(token: string, createGiftDto: CreateGiftDto, file) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string);
    let result;
    let url;
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (user === null) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    const existingGift = await this.actionTypeRepository.findOne({
      where: { actionType: createGiftDto.actionType as TransactionActionTypes },
    });
    if (existingGift) throw new HttpException('Gift Already Exists!', HttpStatus.CONFLICT);
    if (user.role === UserRoleEnum.ADMIN) {
      if (file) {
        result = await this.cloudinary.uploadImage(file, 'gift').catch(() => {
          throw new BadRequestException('Invalid file type.');
        });
        url = result.url;
      }

      const gift = this.actionTypeRepository.create({ ...createGiftDto, adminId: user.id, gift: true });
      if (gift) {
        if (url) {
          gift.setGiftImageUrl(url);
        }
      }
      const newGift = await this.actionTypeRepository.save(gift);
      const obj = {
        actionType: `Receive${createGiftDto.actionType}`,
        cost: -createGiftDto.cost,
        imageUrl: createGiftDto.imageUrl,
      };

      await this.actionTypeRepository.save(obj);
      return newGift;
    } else {
      throw new HttpException('Must be an Admin!', HttpStatus.FORBIDDEN);
    }
  }

  async updateGift(token: string, id: string, updateGiftDto: CreateGiftDto, file) {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.helper.decode(tokenValue as string);
    let result;
    let url;
    const user = decoded ? await this.helper.validateUser(decoded) : null;
    if (user === null) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (user.role === UserRoleEnum.ADMIN) {
      const gift = await this.actionTypeRepository.findOneBy({ id });
      if (!gift) {
        throw new HttpException('Gift not found!', HttpStatus.NOT_FOUND);
      }
      if (file) {
        result = await this.cloudinary.uploadImage(file, 'gift').catch(() => {
          throw new BadRequestException('Invalid file type.');
        });
        url = result.url;
      }
      if (url) {
        gift.setGiftImageUrl(url);
      }
      const updatedGift = Object.assign(gift, updateGiftDto);
      await this.actionTypeRepository.save(updatedGift);
      return updatedGift;
    } else {
      throw new HttpException('Must be an Admin!', HttpStatus.FORBIDDEN);
    }
  }

  public async deleteGift(id: string) {
    const gift = await this.actionTypeRepository.findOneBy({ id });
    if (!gift) {
      throw new HttpException('Gift not found!', HttpStatus.NOT_FOUND);
    }
    const res = await this.actionTypeRepository.remove(gift);
    if (res) {
      return new GlobalResponseDto('Deleted Successfully');
    } else {
      return new GlobalResponseDto('Deletion unsuccessful!');
    }
  }
}
