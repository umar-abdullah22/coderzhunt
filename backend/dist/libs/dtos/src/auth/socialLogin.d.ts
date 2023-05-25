import { SocialProviderEnum, UserInterestedGenderEnum, UserSelfGenderEnum } from '../../../types/src';
export declare class SocialLoginRequestDto {
    token: string;
    socialProvider: SocialProviderEnum;
    userName: string;
    email: string;
    password: string;
    selfGender: UserSelfGenderEnum;
    interestedGender: UserInterestedGenderEnum;
}
