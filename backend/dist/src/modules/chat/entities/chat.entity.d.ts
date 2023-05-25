import { IChatParams } from '../../../../libs/types/src';
import { Attachment } from './attachment.entity';
export declare class Chat {
    constructor(params?: IChatParams);
    readonly id: string;
    readonly createdAt: Date;
    message: string;
    receiver: string;
    sender: string;
    seen: boolean;
    attachments: Attachment;
    chat: Chat;
    readonly updatedAt: Date;
}
