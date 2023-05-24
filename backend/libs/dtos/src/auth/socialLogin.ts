import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SocialProviderEnum, UserInterestedGenderEnum, UserSelfGenderEnum } from '../../../types/src';

export class SocialLoginRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @IsEnum(SocialProviderEnum)
  socialProvider: SocialProviderEnum;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserSelfGenderEnum)
  selfGender: UserSelfGenderEnum;

  @IsNotEmpty()
  @IsEnum(UserInterestedGenderEnum)
  interestedGender: UserInterestedGenderEnum;
}
