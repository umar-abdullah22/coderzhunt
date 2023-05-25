import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionRequestDto, UpdateSubscriptionRequestDto } from '../../../libs/dtos/src';
export declare class SubscriptionsController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionsService);
    demo(): void;
    findAll(): Promise<Subscription[]>;
    createdSubscription(subscriptionDto: CreateSubscriptionRequestDto): Promise<Subscription>;
    findOne(id: string): Promise<Subscription>;
    updateById(id: string, body: UpdateSubscriptionRequestDto): Promise<Subscription>;
    deleteById(id: string): Promise<Subscription>;
}
