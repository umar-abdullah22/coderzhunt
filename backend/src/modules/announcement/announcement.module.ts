import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Announcement } from './entities/announcement.entity';
import { AnnouncementService } from './announcement.service';
import { AnnouncementController } from './announcement.controller';
import { MailService } from '../mail/mail.service';
import { CloudinaryConfigService } from '@config/cloudinary.config';
import { Email } from '../mail/entities/email.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Announcement, Email]), AuthModule],
  controllers: [AnnouncementController],
  providers: [UserService, AnnouncementService, MailService, CloudinaryConfigService],
})
export class AnnouncementsModule {}
