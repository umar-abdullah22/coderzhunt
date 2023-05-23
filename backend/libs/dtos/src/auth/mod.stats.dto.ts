import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min, IsOptional, IsDate } from 'class-validator';
export class GetModsStatsQueryParamsDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '12323232', description: 'Mod Id type here' })
  public readonly modId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'date', description: 'Start Date type here' })
  public readonly startDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'date', description: 'End Date type here' })
  public readonly endDate?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 's', description: 'duration ' })
  public readonly duration?: 'daily' | 'weekly' | 'monthly';
}
