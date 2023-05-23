import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'favorites' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  favorites: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
