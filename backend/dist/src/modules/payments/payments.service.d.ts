import { User } from '../user/entities/user.entity';
import { EntityManager } from 'typeorm';
import { Payments } from './entities/payment.entity';
import { Response } from 'express';
import { PaymentRequestBody } from './types/PaymentRequestBody';
export declare class PaymentsService {
    private readonly entity;
    private stripe;
    private readonly repository;
    private readonly subscription;
    private readonly paymentsRepository;
    private readonly helper;
    private readonly userService;
    private readonly subscriptionService;
    constructor(entity: EntityManager);
    createPayment(paymentRequestBody: PaymentRequestBody): Promise<any>;
    storepayment(res: any, paymentRequestBody: PaymentRequestBody): Promise<void>;
    processPayment(query: any, res: Response): Promise<void>;
    grantCoinsForPackage(user: User, packageId: string): Promise<void>;
    findOne(token: string): Promise<Payments[]>;
}
