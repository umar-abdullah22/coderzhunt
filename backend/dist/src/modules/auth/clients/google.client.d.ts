import { AuthorizeResponseDto, SocialLoginRequestDto } from '../../../../libs/dtos/src';
import { User } from '../../user/entities/user.entity';
import { EntityManager } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class GoogleClient {
    private readonly entity;
    private readonly repository;
    private readonly profile;
    private readonly configService;
    private readonly helper;
    private readonly userService;
    private readonly mailService;
    private readonly jwt;
    constructor(jwt: JwtService, entity: EntityManager);
    validate(body: SocialLoginRequestDto): Promise<AuthorizeResponseDto | User>;
}
