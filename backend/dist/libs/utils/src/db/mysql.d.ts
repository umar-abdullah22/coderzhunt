import { type FindOperator } from 'typeorm';
import { Uuid } from '../../../utils/src';
export declare const UuidTransformer: {
    to: (value: Uuid | FindOperator<Uuid[]>) => string | FindOperator<any>;
    from: (value: string) => Uuid;
};
