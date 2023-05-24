import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  PrimaryColumn,
  Generated,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity({ name: 'email' })
export class Email {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ nullable: true })
  receiver: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Column()
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
