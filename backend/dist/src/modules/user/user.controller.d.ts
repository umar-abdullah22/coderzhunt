import { ContactSupportDto, OauthRequestDto, GetUsersQueryParamsDto, TransactionActionTypesDto } from '../../../libs/dtos/src';
import { UpdateProfileRequestDto } from '../../../libs/dtos/src/profile';
import { BlockUserReason } from './../../../libs/types/src/db/entities/user';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    updateProfileById(id: string, body: UpdateProfileRequestDto, files: any): Promise<any>;
    create(id: string, token: string, fakeId?: string): Promise<import("./entities/visit.profile.entity").VisitProfile>;
    getVisits(token: string): Promise<import("./entities/visit.profile.entity").VisitProfile[]>;
    markFavorite(favoriteId: string, token: string): Promise<void>;
    getFavorites(token: string): Promise<import("./entities/customer.favourite.entity").Favorite[]>;
    getRandom(token: string): Promise<import("./entities/user.entity").User>;
    findAll(token: string, params?: GetUsersQueryParamsDto): Promise<{
        page: string;
        pageSize: number;
        nextPage: number;
        total: any;
        data: any;
    }>;
    getUser(userId: string): Promise<any>;
    getEmailforoauth({ email }: OauthRequestDto): Promise<import("./entities/user.entity").User>;
    findDistance(userId: string, token: string): Promise<number>;
    markBlock(userId: string, reason: BlockUserReason, token: string): Promise<void>;
    getBlockUsers(token: string): Promise<import("./entities/user.block.entity").Block[]>;
    removeBlockUsers(userId: string, token: string): Promise<void>;
    removeUser(token: string): Promise<import("../../../libs/dtos/src").GlobalResponseDto>;
    removePhoto(id: string, token: string): Promise<any>;
    contactSupport(token: string, body: ContactSupportDto): Promise<import("../../../libs/dtos/src").GlobalResponseDto>;
    getCoins(token: string): Promise<number>;
    makeTransaction(token: string, body: TransactionActionTypesDto, bonus: string): Promise<{
        success: boolean;
    }>;
}
