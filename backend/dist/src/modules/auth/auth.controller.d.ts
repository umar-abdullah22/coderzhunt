import { UpdateBonusCodeDto } from './../../../libs/dtos/src/auth/updateBonusCode.dto';
import { CreateBonusCodeDto } from './../../../libs/dtos/src/auth/bonusCode.dto';
import { UpdateModDto } from './../../../libs/dtos/src/auth/updateMod.dto';
import { CreateModDto } from './../../../libs/dtos/src/auth/createMod.dto';
import { CreateBulkMessagesDto } from './../../../libs/dtos/src/auth/createBulkMessages.dto';
import { GetModsStatsQueryParamsDto } from './../../../libs/dtos/src/auth/mod.stats.dto';
import { SocialLoginRequestDto } from './../../../libs/dtos/src/auth/socialLogin';
import { AuthService } from './auth.service';
import { User } from '../user/entities/user.entity';
import { AdminModRegisterRequestDto, type AuthorizeResponseDto, LoginRequestDto, UserRegisterRequestDto, ForgetRequestDto, ResetPasswordRequestDto, ScheduleMessageDto, SpamMessagesDto } from '../../../libs/dtos/src';
import { type GlobalResponseDto } from '../../../libs/dtos/src';
import { UpdateAccessDto } from '../../../libs/dtos/src/auth/updateAccess';
import { UpdateStatusDto } from '../../../libs/dtos/src/auth/updateStatus';
import { AuthHelper } from './auth.helper';
export declare class AuthController {
    private readonly authService;
    private readonly authHelper;
    constructor(authService: AuthService, authHelper: AuthHelper);
    getUsersemail(email: string): Promise<User>;
    RegisterUser(registerDto: UserRegisterRequestDto): Promise<User>;
    RegisterAdminMod(registerDto: AdminModRegisterRequestDto): Promise<User>;
    login(loginRequestDto: LoginRequestDto): Promise<AuthorizeResponseDto | never>;
    approveAccessUser(updateAccessDto: UpdateAccessDto): Promise<GlobalResponseDto>;
    approveStatusUser(updateStatusDto: UpdateStatusDto): Promise<GlobalResponseDto>;
    updateModeratorStatus(updateStatusDto: UpdateStatusDto): Promise<GlobalResponseDto>;
    getUsers(): Promise<User[]>;
    verifyEmail(token: string, res: any): Promise<any>;
    verifyProfile(id: string): Promise<import("../user/entities/customer.profiledata.entity").CustomerProfileData>;
    forgetPassword({ email }: ForgetRequestDto): Promise<GlobalResponseDto>;
    resetPassword(token: string, resetPasswordRequestDto: ResetPasswordRequestDto): Promise<GlobalResponseDto>;
    RegisteroauthUser(registerDto: SocialLoginRequestDto | any): Promise<User | AuthorizeResponseDto>;
    onlineUsers(token: string): Promise<{
        moderators: User[];
        customers: User[];
    }>;
    saveEmojis(token: string, file: any): Promise<void>;
    getEmojis(token: string): Promise<any>;
    statsUserReplies(token: string, params: GetModsStatsQueryParamsDto): Promise<{
        Month: string;
        MessageReplies: any;
        modId: string;
    }[][]>;
    statsUserSendMessages(token: string, params: GetModsStatsQueryParamsDto): Promise<{
        Month: string;
        SendMessages: any;
        modId: string;
    }[][]>;
    getMods(token: string): Promise<User[]>;
    bulkVisits(token: string, { fakeUserIds, customerUserIds, message }: CreateBulkMessagesDto, file: any): Promise<import("../chat/entities/chat.entity").Chat[]>;
    createdFake(token: string, modDto: CreateModDto): Promise<User>;
    findOne(token: string, id: string): Promise<User>;
    updateById(token: string, id: string, body: UpdateModDto): Promise<User>;
    deleteById(token: string, id: string): Promise<GlobalResponseDto>;
    createBonusCode(token: string, bonusCodeDto: CreateBonusCodeDto): Promise<import("./entities/bonusCode.entity").BonusCode>;
    verifyBonusCode(token: string, bonusCode: string): Promise<boolean>;
    updateBonusCode(token: string, id: string, { expiryDate }: UpdateBonusCodeDto): Promise<import("./entities/bonusCode.entity").BonusCode>;
    getBonusCodes(token: string): Promise<import("./entities/bonusCode.entity").BonusCode[]>;
    getBonusCodeById(token: string, id: string): Promise<import("./entities/bonusCode.entity").BonusCode>;
    deleteBonusCodeById(token: string, id: string): Promise<GlobalResponseDto>;
    scheduleMessage(token: string, body?: ScheduleMessageDto): Promise<import("./entities/scheduleMessage.entity").ScheduleMessage>;
    findAll(token: string): Promise<import("./entities/scheduleMessage.entity").ScheduleMessage[]>;
    deleteScheduleMessage(token: string, id: string): Promise<GlobalResponseDto>;
    spamMessage(token: string, body: SpamMessagesDto, file: any): Promise<GlobalResponseDto>;
    getStats(token: string): Promise<{
        onlineMods: User[];
        onlineUsers: User[];
        newVerifiedUsers: User[];
        emailsSentToday: number;
        sales: {
            today: number;
            yesterday: number;
            percentageChange: string;
            currentMonth: number;
            lastMonth: number;
        };
    }>;
}
