export interface IMessage {
    message?: string;
    sender?: string;
    receiver?: string;
    moderator?: string;
    seen?: boolean;
    attachments?: any;
    id?: string;
    moderatorIds?: [];
}
export interface IUnseen {
    userId?: string;
    moderatorId?: string;
}
