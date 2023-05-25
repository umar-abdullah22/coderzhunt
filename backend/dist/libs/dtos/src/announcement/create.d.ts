import { type IAnnouncement } from '../../../types/src';
export declare class CreateAnnouncementRequestDto implements IAnnouncement {
    readonly title: string;
    readonly description: string;
    readonly sender: string;
}
