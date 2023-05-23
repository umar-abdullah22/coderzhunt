import { FakeCreator } from './../user/entities/fakeUser.entity';
import { UserSelfGenderEnum } from './../../../libs/types/src/db/entities/user';
import { ChatsGateway } from './../chat/chat.gateway';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum, UserStatusEnum } from '@lib/types';
import { type CreateFakeRequestDto, type UpdateFakeRequestDto } from '@lib/dtos';
import * as fs from 'fs';
import * as path from 'path';
import { CustomerProfileData } from '../user/entities/customer.profiledata.entity';
import { UserService } from '../user/user.service';
import { CloudinaryConfigService } from '@config/cloudinary.config';

@Injectable()
export class FakeService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerProfileData)
    private readonly profile: Repository<CustomerProfileData>,
    @InjectRepository(FakeCreator)
    private readonly fakeCreator: Repository<FakeCreator>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
    @Inject(UserService)
    private readonly userService: UserService,
    private cloudinary: CloudinaryConfigService
  ) {}

  public async createFake(accessToken: string, body: CreateFakeRequestDto, file) {
    const accessTokenValue = accessToken.split(' ')[1];
    const decodedToken = await this.helper.decode(accessTokenValue);
    const user = decodedToken ? await this.helper.validateUser(decodedToken) : null;
    let result;
    let url;
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }

    if (file) {
      result = await this.cloudinary.uploadImage(file, 'fake').catch(() => {
        throw new HttpException('Invalid file type.', HttpStatus.BAD_REQUEST);
      });
      url = result.url;
    }

    const fakeUser = new User({
      role: UserRoleEnum.FAKE,
      status: UserStatusEnum.VERIFIED,
      selfGender: body.selfGender,
      interestedGender: body.interestedGender,
      userName: body.userName,
      email: body.email,
    });
    if (fakeUser) {
      const profile = new CustomerProfileData();
      profile.children = body.children;
      profile.isEmailVerified = UserStatusEnum.VERIFIED;
      profile.life = body.life;
      profile.relationshipStatus = body.relationshipStatus;
      profile.smoker = body.smoker;
      if (body.dob) {
        profile.dateOfBirth = await this.validateDateOfBirth(body.dob);
      }
      if (url) {
        profile.setAvatarUrl(url);
      }
      if (profile) {
        fakeUser.profile = profile;
        await this.profile.save(profile);
      }
      const savedUser = await this.userRepository.save(fakeUser);
      if (savedUser) {
        const creator = new FakeCreator();
        creator.user = savedUser;
        creator.createdBy = user?.id;

        await this.fakeCreator.save(creator);

        savedUser.address = await this.userService.validateAndSaveAddress(body.postalCode, savedUser);

        // return savedUser;
      }
    }
  }

  public async findAll() {
    const result: User[] = await this.userRepository.find({ where: { role: UserRoleEnum.FAKE } });
    return result;
  }

  public async findOne(id: string) {
    const fake: User = await this.userRepository.findOneBy({ id, role: UserRoleEnum.FAKE });
    if (fake == null) {
      throw new HttpException('Fake Account not found!', HttpStatus.NOT_FOUND);
    }
    return fake;
  }

  public async updateById(id: string, body: UpdateFakeRequestDto): Promise<User> {
    const fake = await this.userRepository.findOneBy({ id, role: UserRoleEnum.FAKE });
    if (fake == null) {
      throw new HttpException('Fake Account not found!', HttpStatus.NOT_FOUND);
    } else {
      if (body.name) fake.setUserName(body.name);
      if (body.email) fake.setEmail(body.email);
      if (body.gender) fake.setSelfGender(body.gender);
      if (body.dob) fake.profile.setDateOfBirth(body.dob);
      if (body.smoker) fake.profile.setSmoker(body.smoker);
      if (body.relation) fake.profile.setRelationShipStatus(body.relation);
      if (body.postalCode) fake.address.setAddress(body.postalCode);
      if (body.life) fake.profile.setLife(body.life);
      if (body.children) fake.profile.setChildren(body.children);

      return await this.userRepository.save(fake);
    }
  }

  public async deleteById(id: string) {
    const fake = await this.userRepository.findOneBy({ id, role: UserRoleEnum.FAKE });
    if (fake == null) {
      throw new HttpException('Fake Account not found!', HttpStatus.NOT_FOUND);
    }
    return await this.userRepository.remove(fake);
  }

  public async getRandomFake() {
    const randomUser = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .orderBy('RAND()')
      .where('user.role =:role', { role: UserRoleEnum.FAKE })
      .limit(1)
      .getOne();
    return randomUser;
    // });
  }

  generateRandomMessage(): string {
    const messages: string[] = ['Hey, wanna catch up?', 'Hi there! How are you doing?', 'Hello! Are you new here?'];
    const index = Math.floor(Math.random() * messages?.length);
    return messages[index];
  }

  generateRandomTimeInterval(): number {
    const min = 1;
    const max = 5;
    return Math.floor(Math.random() * (max - min + 1) + min) * 60 * 1000;
  }

  async validateDateOfBirth(dob) {
    const [year, month, day] = dob.split('-');
    // The correct order is year, month, and day
    const parsedDateOfBirth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const now = new Date();
    const ageInMs: number = now.getTime() - parsedDateOfBirth.getTime();
    const ageInYears: number = ageInMs / (1000 * 60 * 60 * 24 * 365.25);
    // 365.25 days in a year to account for leap years

    if (ageInYears >= 18 && ageInYears <= 65) {
      // date of birth is valid
      return parsedDateOfBirth;
    } else {
      throw new HttpException('Invalid date of birth', HttpStatus.BAD_REQUEST);
    }
  }
}
