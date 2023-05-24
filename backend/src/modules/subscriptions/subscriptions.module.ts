import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { MailService } from '../mail/mail.service';
import { CloudinaryConfigService } from '../../config/cloudinary.config';
import { Email } from '../mail/entities/email.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Subscription, Email]), AuthModule],
  controllers: [SubscriptionsController],
  providers: [UserService, SubscriptionsService, MailService, CloudinaryConfigService],
})
export class SubscriptionsModule {}
