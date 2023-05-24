import { FakeService } from './fake.service';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Headers,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole, UserRoleEnum } from '../../../libs/types/src';
import { JwtAuthGuard, RolesGuard } from '../../guards';
import { SWAGGER_API_TAG } from '../../../libs/constants/src';
import { CreateFakeRequestDto, UpdateFakeRequestDto } from '../../../libs/dtos/src';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../user/entities/user.entity';
@UseGuards(JwtAuthGuard, RolesGuard)
@UserRole(UserRoleEnum.ADMIN)
@ApiBearerAuth()
@Controller('fake')
@ApiTags(SWAGGER_API_TAG.FAKE)
export class FakeController {
  constructor(private readonly fakeService: FakeService) {}

  @Get()
  @ApiOperation({ summary: 'All Fake Accounts!' })
  @ApiResponse({
    status: 200,
    description: 'Fake!',
    type: User,
  })
  async findAll() {
    return await this.fakeService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('createFake')
  @ApiOperation({ summary: 'Create Fake Account' })
  @ApiResponse({
    status: 201,
    description: 'Fake Account created!',
    type: User,
  })
  async createdFake(@Headers('authorization') token: string, @Body() fakeDto: any, @UploadedFile() file) {
    return await this.fakeService.createFake(token, fakeDto, file);
  }

  @ApiOperation({ summary: 'Get a Fake Account' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter fake user id',
    type: 'string',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.fakeService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Fake Account' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter fake user id',
    type: 'string',
  })
  @Put('updateFake/:id')
  async updateById(@Param('id') id: string, @Body() body: UpdateFakeRequestDto) {
    return await this.fakeService.updateById(id, body);
  }

  @ApiOperation({ summary: 'Delete Fake account' })
  @ApiResponse({ status: 200, description: 'Deleted.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Please enter fake user id',
    type: 'string',
  })
  @Delete('deleteFake/:id')
  async deleteById(@Param('id') id: string) {
    return await this.fakeService.deleteById(id);
  }
}
