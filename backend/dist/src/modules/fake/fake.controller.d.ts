import { FakeService } from './fake.service';
import { UpdateFakeRequestDto } from '../../../libs/dtos/src';
import { User } from '../user/entities/user.entity';
export declare class FakeController {
    private readonly fakeService;
    constructor(fakeService: FakeService);
    findAll(): Promise<User[]>;
    createdFake(token: string, fakeDto: any, file: any): Promise<void>;
    findOne(id: string): Promise<User>;
    updateById(id: string, body: UpdateFakeRequestDto): Promise<User>;
    deleteById(id: string): Promise<User>;
}
