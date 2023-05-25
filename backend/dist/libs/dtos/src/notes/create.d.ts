import { type INotes } from '../../../types/src';
export declare class CreateNotesRequestDto implements INotes {
    readonly note: string;
    readonly creator: string;
    readonly userId: string;
}
