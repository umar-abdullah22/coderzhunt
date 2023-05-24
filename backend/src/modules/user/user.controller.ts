import { SWAGGER_API_TAG } from '../../../libs/constants/src';
import {
  ContactSupportDto,
  OauthRequestDto,
  GetUsersQueryParamsDto,
  TransactionActionTypesDto,
} from '../../../libs/dtos/src';
import { UpdateProfileRequestDto } from '../../../libs/dtos/src/profile';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BlockUserReason, UserRoleEnum } from './../../../libs/types/src/db/entities/user';
import { UserService } from './user.service';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { UserRole } from '../../../libs/types/src';

@UseGuards(JwtAuthGuard, RolesGuard)
@UserRole(UserRoleEnum.CUSTOMER)
@ApiBearerAuth()
@ApiTags(SWAGGER_API_TAG.CUSTOMER)
@Controller('customer')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter user id',
    type: 'string',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar' }, { name: 'photos' }]))
  @Put('updateProfile/:id')
  async updateProfileById(@Param('id') id: string, @Body() body: UpdateProfileRequestDto, @UploadedFiles() files) {
    return await this.userService.updateInfoById(id, body, files);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter visiting profile id',
    type: 'string',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.CUSTOMER, UserRoleEnum.MODERATOR)
  @Post('visit-profile/:id')
  async create(@Param('id') id: string, @Headers('authorization') token: string, @Query('fake') fakeId?: string) {
    //need to do by access token
    return this.userService.addToVisit(id, token, fakeId);
  }

  @Get('profiles')
  async getVisits(@Headers('authorization') token: string) {
    //need to do by access token
    return this.userService.getVisits(token);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter favorite profile id',
    type: 'string',
  })
  @Post('favorite/:id')
  async markFavorite(@Param('id') favoriteId: string, @Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.markFavorite(favoriteId, token);
  }

  @Get('favorites')
  async getFavorites(@Headers('authorization') token: string) {
    //need to do by access token
    return this.userService.getFavorites(token);
  }

  @Get('getRandomUser')
  async getRandom(@Headers('authorization') token: string) {
    return this.userService.getRandom(token);
  }

  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  @ApiQuery({ name: 'gender', required: false, type: String })
  @ApiQuery({ name: 'nickname', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'startAge', required: false, type: String })
  @ApiQuery({ name: 'endAge', required: false, type: String })
  @ApiQuery({ name: 'distanceInMiles', required: false, type: String })
  @ApiQuery({ name: 'newUsers', required: false, type: String })
  @ApiQuery({ name: 'fsk', required: false, type: String })
  @ApiQuery({ name: 'postalCode', required: false, type: String })
  @Get()
  async findAll(@Headers('authorization') token: string, @Query() params?: GetUsersQueryParamsDto) {
    return this.userService.findAll(token, params, false);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter user id',
    type: 'string',
  })
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.userService.getCustomer(userId);
  }

  @Put('email')
  async getEmailforoauth(@Body() { email }: OauthRequestDto) {
    return await this.userService.getCustomerData(email);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter user id',
    type: 'string',
  })
  @Get('distance/:id')
  async findDistance(@Param('id') userId: string, @Headers('authorization') token: string) {
    return this.userService.getUsersDistance(userId, token);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter user id',
    type: 'string',
  })
  @Post('block/:id')
  async markBlock(
    @Param('id') userId: string,
    @Body('reason') reason: BlockUserReason,
    @Headers('authorization') token: string
  ) {
    //need to do by access token
    return await this.userService.markBlock(userId, token, reason);
  }

  @Post('blockUsers')
  async getBlockUsers(@Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.getBlocked(token);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter user id',
    type: 'string',
  })
  @Put('block/:id')
  async removeBlockUsers(@Param('id') userId: string, @Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.removeBlocked(userId, token);
  }

  @Delete()
  async removeUser(@Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.removeUser(token);
  }

  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter photo id',
    type: 'string',
  })
  @Delete('deletePhoto/:id')
  async removePhoto(@Param('id') id: string, @Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.removePhoto(id, token);
  }

  @Post('contact-support')
  async contactSupport(@Headers('authorization') token: string, @Body() body: ContactSupportDto) {
    //need to do by access token
    return await this.userService.contactSupport(token, body);
  }

  @Post('get-coins')
  async getCoins(@Headers('authorization') token: string) {
    //need to do by access token
    return await this.userService.getCoins(token);
  }

  @Post('make-transaction')
  async makeTransaction(
    @Headers('authorization') token: string,
    @Body() body: TransactionActionTypesDto,
    @Body('bonus') bonus: string
  ) {
    //need to do by access token
    return await this.userService.makeTransaction(token, body.actionType, body.receiverId, body.subAction, bonus);
  }
}
