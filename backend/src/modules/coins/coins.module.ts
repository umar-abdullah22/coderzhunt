import { CoinsService } from './coins.service';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CoinsController } from './coins.controller';
import { UserTransactionActionTypes } from '../user/entities/user.transaction.actiontypes.entity';
import { MailService } from '../mail/mail.service';
import { CloudinaryConfigService } from '../../config/cloudinary.config';
import { Email } from '../mail/entities/email.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserTransactionActionTypes, Email]), AuthModule],
  controllers: [CoinsController],
  providers: [UserService, CoinsService, MailService, CloudinaryConfigService],
})
export class CoinsModule {}
