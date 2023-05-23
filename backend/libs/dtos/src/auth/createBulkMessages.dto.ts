import { ApiProperty } from '@nestjs/swagger';

export class CreateBulkMessagesDto {
  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Array of fake user IDs',
  })
  fakeUserIds: string[];

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'Array of customer user IDs',
  })
  customerUserIds: string[];

  @ApiProperty({
    type: String,
    description: 'Array of customer user IDs',
  })
  message: string;
}
