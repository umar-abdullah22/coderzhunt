import { ISubscriptionParams } from '../../../../libs/types/src';
export declare class Subscription {
    constructor(params?: ISubscriptionParams);
    readonly id: string;
    readonly createdAt: Date;
    packageName: string;
    bestSelling: boolean;
    creator: string;
    noOfCoins: number;
    amount: number;
    readonly updatedAt: Date;
    setSubscriptionPackageType(packageType: string): void;
    setSubscriptionBestSelling(bestSelling: boolean): void;
    setSubscriptionAmount(amount: number): void;
    setSubscriptionNoOfCoins(noOfCoins: number): void;
}
