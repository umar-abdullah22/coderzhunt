import { Chat } from '../../chat/entities/chat.entity';
import { UserRoleEnum } from './../../../../libs/types/src/db/entities/user';
export declare class FakeChat {
    readonly id: string;
    moderatorId: string;
    type: UserRoleEnum;
    chat: Chat;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
