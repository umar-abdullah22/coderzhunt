import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsBoolean, Min, Max } from 'class-validator';
export class UpdateFakeRequestDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Leave Empty if not wanted to update' })
  public readonly name?: string;
  email?: any;
  gender?: any;
  dob?: any;
  smoker?: any;
  age?: any;
  life?: any;
  relation?: any;
  children?: any;
  postalCode?: any;
}
