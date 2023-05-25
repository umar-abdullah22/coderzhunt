import { IToken, ITokenParams } from '../../../../libs/types/src';
export declare class Token implements IToken {
    constructor(params?: ITokenParams);
    readonly id: string;
    readonly userId: string;
    token: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
