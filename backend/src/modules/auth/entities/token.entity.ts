import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, Generated } from 'typeorm';
import { IToken, ITokenParams } from '../../../../libs/types/src';
@Entity({ name: 'token' })
export class Token implements IToken {
  constructor(params?: ITokenParams) {
    if (params) {
      this.userId = params.userId;
      this.token = params.token;
    }
  }

  @PrimaryColumn()
  @Generated('uuid')
  readonly id: string;

  @Column({
    nullable: false,
  })
  readonly userId: string;

  @Column({
    nullable: false,
    // type: 'uuid',
  })
  token: string;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
