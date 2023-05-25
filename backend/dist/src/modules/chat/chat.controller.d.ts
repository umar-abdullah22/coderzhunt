import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { GetChatDto } from '../../../libs/dtos/src';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    createdAnnouncement(chatDto: any, token?: string): Promise<Chat>;
    getMessages(token: string, { sender, receiver }: GetChatDto): Promise<{
        chats: Chat[];
        moderatorIds: number[];
    }>;
    getChatUsers(token: string, userId: string): Promise<any>;
    createdFakeChat(token: string, chatDto: any): Promise<Chat | import("../fake/entities/fakeChat.entity").FakeChat>;
    test(sender: string, receiver: string, message: string): Promise<void>;
    getModChatUsers(token: string, modId: string): Promise<{
        fakeChatPartners: any[];
    }>;
}
