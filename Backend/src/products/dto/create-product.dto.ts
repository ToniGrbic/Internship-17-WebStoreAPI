import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  ratingCount?: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  storeId: number;
}
