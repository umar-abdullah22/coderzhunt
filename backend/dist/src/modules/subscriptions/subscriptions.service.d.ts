import { Subscription } from './entities/subscription.entity';
import { AuthHelper } from '../auth/auth.helper';
import { User } from '../user/entities/user.entity';
import { type CreateSubscriptionRequestDto, type UpdateSubscriptionRequestDto } from '../../../libs/dtos/src';
import { Repository } from 'typeorm';
export declare class SubscriptionsService {
    private readonly userRepository;
    private readonly subscriptionRepository;
    private readonly helper;
    constructor(userRepository: Repository<User>, subscriptionRepository: Repository<Subscription>, helper: AuthHelper);
    createSubscription(body: CreateSubscriptionRequestDto): Promise<Subscription | never>;
    findAll(): Promise<Subscription[]>;
    findOne(id: string): Promise<Subscription>;
    updateById(id: string, body: UpdateSubscriptionRequestDto): Promise<Subscription>;
    deleteById(id: string): Promise<Subscription>;
}
