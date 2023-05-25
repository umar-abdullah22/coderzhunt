import { UserInterestedGenderEnum } from './../../../types/src/db/entities/user';
import { type IOathUser, type UserRoleEnum } from '../../../types/src';
export declare class UserOauthRegisterRequestDto implements IOathUser {
    readonly selfGender: string;
    readonly interestedGender: UserInterestedGenderEnum;
    readonly userName: string;
    readonly email: string;
    readonly role?: UserRoleEnum;
    password: string;
}
