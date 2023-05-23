import { MailService } from './../mail/mail.service';
import { UserAccountTransaction } from './entities/user.account.transaction.entity';
import { CustomerProfileData } from './entities/customer.profiledata.entity';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserTransactionActionTypes } from './entities/user.transaction.actiontypes.entity';
import { VisitProfile } from './entities/visit.profile.entity';
import { Favorite } from './entities/customer.favourite.entity';
import { Address } from './entities/user.address.entity';
import { Block } from './entities/user.block.entity';
import { Photo } from './entities/user.photos.entity';
import { Payments } from '../payments/entities/payment.entity';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { BonusCode } from '../auth/entities/bonusCode.entity';
import { AuthService } from '../auth/auth.service';
import { Email } from '../mail/entities/email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      CustomerProfileData,
      UserTransactionActionTypes,
      UserAccountTransaction,
      VisitProfile,
      Favorite,
      Address,
      Block,
      Photo,
      Payments,
      BonusCode,
      Email,
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, MailService, CloudinaryConfigService],
})
export class UserModule {}
