import { FakeCreator } from './../user/entities/fakeUser.entity';
import { AuthHelper } from '../auth/auth.helper';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { type CreateFakeRequestDto, type UpdateFakeRequestDto } from '../../../libs/dtos/src';
import { CustomerProfileData } from '../user/entities/customer.profiledata.entity';
import { UserService } from '../user/user.service';
import { CloudinaryConfigService } from '../../config/cloudinary.config';
export declare class FakeService {
    private readonly userRepository;
    private readonly profile;
    private readonly fakeCreator;
    private readonly helper;
    private readonly userService;
    private cloudinary;
    constructor(userRepository: Repository<User>, profile: Repository<CustomerProfileData>, fakeCreator: Repository<FakeCreator>, helper: AuthHelper, userService: UserService, cloudinary: CloudinaryConfigService);
    createFake(accessToken: string, body: CreateFakeRequestDto, file: any): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    updateById(id: string, body: UpdateFakeRequestDto): Promise<User>;
    deleteById(id: string): Promise<User>;
    getRandomFake(): Promise<User>;
    generateRandomMessage(): string;
    generateRandomTimeInterval(): number;
    validateDateOfBirth(dob: any): Promise<Date>;
}
