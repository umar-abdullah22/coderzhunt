import { Subscription } from './entities/subscription.entity';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { User } from '../user/entities/user.entity';
import { type CreateSubscriptionRequestDto, type UpdateSubscriptionRequestDto } from '../../../libs/dtos/src';
import { Repository } from 'typeorm';
import { type Package, UserRoleEnum, getPackageFromNumber } from '../../../libs/types/src';
@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper
  ) {}

  public async createSubscription(body: CreateSubscriptionRequestDto): Promise<Subscription | never> {
    const { creator, packageType }: CreateSubscriptionRequestDto = body;
    const senderExist = await this.userRepository.findOne({
      where: {
        id: creator,
      },
    });
    if (senderExist.role === UserRoleEnum.ADMIN) {
      const subscription = new Subscription({
        ...body,
      });
      return await this.subscriptionRepository.save(subscription);
    } else {
      throw new HttpException('Sender not found!', HttpStatus.NOT_FOUND);
    }
  }

  public async findAll(): Promise<Subscription[]> {
    return await this.subscriptionRepository.find();
  }

  public async findOne(id: string) {
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (subscription == null) {
      throw new HttpException('Subscription not found!', HttpStatus.NOT_FOUND);
    }
    return subscription;
  }

  public async updateById(id: string, body: UpdateSubscriptionRequestDto): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (subscription == null) {
      throw new HttpException('Subscription not found!', HttpStatus.NOT_FOUND);
    } else {
      if (body.amount >= 0) subscription.setSubscriptionAmount(body.amount);
      if (body.noOfCoins >= 0) subscription.setSubscriptionNoOfCoins(body.noOfCoins);
      if (body.bestSelling || !body.bestSelling) {
        subscription.setSubscriptionBestSelling(body.bestSelling);
      }
      if (body.packageType) subscription.setSubscriptionPackageType(body.packageType);

      return await this.subscriptionRepository.save(subscription);
    }
  }

  public async deleteById(id: string) {
    const subscription = await this.subscriptionRepository.findOneBy({ id });
    if (subscription == null) {
      throw new HttpException('Subscription not found!', HttpStatus.NOT_FOUND);
    }
    return await this.subscriptionRepository.remove(subscription);
  }
}
