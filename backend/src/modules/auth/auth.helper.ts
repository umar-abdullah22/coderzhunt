import { Injectable, HttpException, HttpStatus, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum, UserRoleEnum, type IJwtConfig } from '../../../libs/types/src';
import { OAuth2Client } from 'google-auth-library';
import { BonusCode } from './entities/bonusCode.entity';
import { UserBonusCode } from './entities/userBonusCode.entity';

@Injectable()
export class AuthHelper {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(ConfigService)
  private readonly configService: ConfigService;
  @InjectRepository(BonusCode)
  private readonly bonusRepo: Repository<BonusCode>;

  @InjectRepository(UserBonusCode)
  private readonly userBonusRepo: Repository<UserBonusCode>;

  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<User> {
    const user = await this.repository.findOne({ where: { id: decoded.id } });
    if (user) {
      delete user.password;
      return user;
    }
  }

  // Generate JWT Token
  public generateToken(user: User): string {
    return this.jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      {
        secret: process.env.JWT_SECRET || this.configService.get<IJwtConfig>(ConfigEnum.JWT_TOKEN).secret,
      }
    );
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public async encodePassword(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    return hashedPassword;
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  public async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);
    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const user: User = await this.validateUser(decoded);
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
  public GoogleClient() {
    const client = new OAuth2Client(
      this.configService.get('GOOGLE_APP_ID'),
      this.configService.get('GOOGLE_APP_SECRET')
    );
    return client;
  }

  public async verifyBonusCode(token: string, bonusCode: string): Promise<boolean> {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.decode(tokenValue as string);
    const user = await this.validateUser(decoded);
    if (!user) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    const bonus: BonusCode = await this.bonusRepo.findOne({ where: { bonusCode } });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (bonus) {
      const currentTime = new Date();
      const expiryDateTime = new Date(bonus.expiryDate);
      return currentTime <= expiryDateTime;
    } else {
      throw new HttpException('Bonus Code not found', HttpStatus.NOT_FOUND);
    }
  }

  public async getBonusCode(token: string, id?: string, bonusCode?: string): Promise<BonusCode> {
    const tokenValue = token.split(' ')[1];
    const decoded = await this.decode(tokenValue as string);
    const user = await this.validateUser(decoded);
    if (!user) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    const bonus: BonusCode = id
      ? await this.bonusRepo.findOne({ where: { id } })
      : await this.bonusRepo.findOne({ where: { bonusCode } });
    if (!bonus) throw new HttpException('Bonus Code NOT FOUND', HttpStatus.NOT_FOUND);
    return bonus;
  }

  public async useBonusCode(user: User, bonusCode: BonusCode) {
    const userBonusCode = await this.userBonusRepo.findOne({
      where: {
        user: { id: user.id },
        bonusCode: { id: bonusCode.id },
      },
    });
    if (userBonusCode) {
      throw new HttpException('This user has already used this bonus code.', HttpStatus.CONFLICT);
    }

    const newUserBonusCode = new UserBonusCode();
    newUserBonusCode.user = user;
    newUserBonusCode.bonusCode = bonusCode;

    return await this.userBonusRepo.save(newUserBonusCode);

    // Here, you can apply the bonus code effect, like adding coins to the user's account
  }
}
