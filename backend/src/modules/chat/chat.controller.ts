import { ChatService } from './chat.service';
import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors, Headers, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_API_TAG } from '../../../libs/constants/src';
import { Chat } from './entities/chat.entity';
import { Get, Param, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common/decorators';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { GetChatDto } from '../../../libs/dtos/src';
import { JwtAuthGuard, RolesGuard } from '../../guards';
import { UserRole, UserRoleEnum } from '../../../libs/types/src';
@Controller('chats')
@ApiTags(SWAGGER_API_TAG.CHAT)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.MODERATOR, UserRoleEnum.CUSTOMER)
  @ApiBearerAuth()
  @Post('createChat')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create Chat' })
  @ApiResponse({
    status: 201,
    description: 'Chat created!',
    type: Chat,
  })
  async createdAnnouncement(@Body() chatDto: any, @Headers('authorization') token?: string) {
    return await this.chatService.createChat(chatDto, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.MODERATOR, UserRoleEnum.CUSTOMER)
  @ApiBearerAuth()
  @Get('get-messages')
  @ApiOperation({ summary: 'get Chat' })
  @ApiResponse({
    status: 201,
    description: 'Chat fetched!',
    type: Chat,
  })
  @ApiQuery({ name: 'sender', required: true, type: String })
  @ApiQuery({ name: 'receiver', required: true, type: String })
  async getMessages(@Headers('authorization') token: string, @Query() { sender, receiver }: GetChatDto) {
    return await this.chatService.getMessages(sender, receiver, token);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.MODERATOR, UserRoleEnum.CUSTOMER)
  @ApiBearerAuth()
  @Get('getChatUsers')
  @ApiOperation({ summary: 'get Chat Users' })
  @ApiResponse({
    status: 201,
    description: 'Users fetched!',
    type: Chat,
  })
  async getChatUsers(@Headers('authorization') token: string, @Query('userId') userId: string) {
    return await this.chatService.getChatUsers(token, userId);
  }

  @Post('createFakeChat')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Create Fake Chat' })
  @ApiResponse({
    status: 201,
    description: 'Fake Chat created!',
    type: Chat,
  })
  async createdFakeChat(@Headers('authorization') token: string, @Body() chatDto: any) {
    return await this.chatService.createFakeChat(chatDto, token);
  }

  @Post()
  async test(@Body('sender') sender: string, @Body('receiver') receiver: string, @Body('message') message: string) {
    return await this.chatService.detectFakeAndSendMail(sender, receiver, message);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @UserRole(UserRoleEnum.MODERATOR, UserRoleEnum.ADMIN)
  @ApiBearerAuth()
  @Get('getModChatUsers')
  @ApiOperation({ summary: 'get Chat Users' })
  @ApiResponse({
    status: 201,
    description: 'Users fetched!',
    type: Chat,
  })
  async getModChatUsers(@Headers('authorization') token: string, @Query('modId') modId: string) {
    return await this.chatService.getModChatUsers(token, modId);
  }
}
