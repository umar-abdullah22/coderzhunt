import { UserInterestedGenderEnum, UserSelfGenderEnum } from './../../../types/src/db/entities/user';
import { type IUser, type UserRoleEnum } from '../../../types/src';
export declare class UserRegisterRequestDto implements IUser {
    readonly selfGender: UserSelfGenderEnum;
    readonly interestedGender: UserInterestedGenderEnum;
    readonly userName: string;
    readonly email: string;
    readonly role?: UserRoleEnum;
    password: string;
}
export declare class AdminModRegisterRequestDto implements IUser {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly role?: UserRoleEnum;
    password: string;
}
