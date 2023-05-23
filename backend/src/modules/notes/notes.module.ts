import { CloudinaryConfigService } from './../../config/cloudinary.config';
import { NotesService } from './notes.service';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Notes } from './entities/notes.entity';
import { NotesController } from './notes.controller';
import { MailService } from '../mail/mail.service';
import { Email } from '../mail/entities/email.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Notes, Email]), AuthModule],
  controllers: [NotesController],
  providers: [UserService, NotesService, MailService, CloudinaryConfigService],
})
export class NotesModule {}
