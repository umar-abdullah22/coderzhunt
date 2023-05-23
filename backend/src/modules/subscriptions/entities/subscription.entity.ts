import { ISubscriptionParams, type Package, getPackageFromNumber } from '../../../../libs/types/src';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'subscription' })
export class Subscription {
  constructor(params?: ISubscriptionParams) {
    if (params != null) {
      this.amount = params.amount;
      this.bestSelling = params.bestSelling;
      this.creator = params.creator;
      this.noOfCoins = params.noOfCoins;
      this.packageName = params.packageType;
    }
  }

  @PrimaryGeneratedColumn({})
  readonly id: string;

  @Column({
    nullable: true,
  })
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column({
    nullable: true,
    length: 30,
  })
  packageName: string;

  @Column({ nullable: true })
  bestSelling: boolean;

  @Column({ length: 36, nullable: true })
  creator: string;

  @Column({ nullable: true })
  noOfCoins: number;

  @Column({ nullable: true })
  amount: number;

  @Column({ nullable: true })
  @UpdateDateColumn()
  readonly updatedAt: Date;

  setSubscriptionPackageType(packageType: string) {
    // const packageName: Package = getPackageFromNumber(packageType);
    this.packageName = packageType;
  }

  setSubscriptionBestSelling(bestSelling: boolean) {
    this.bestSelling = bestSelling;
  }

  setSubscriptionAmount(amount: number) {
    this.amount = amount;
  }

  setSubscriptionNoOfCoins(noOfCoins: number) {
    this.noOfCoins = noOfCoins;
  }
}
