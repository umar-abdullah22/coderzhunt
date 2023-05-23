import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min, IsOptional } from 'class-validator';
export class ContactSupportDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'subject', description: 'messsage subject here' })
  public readonly theme?: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'lorem ispsum lorem ispusom', description: 'type message here' })
  public readonly message: string;
}
