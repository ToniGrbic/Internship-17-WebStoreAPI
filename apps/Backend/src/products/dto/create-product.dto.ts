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

  @ApiProperty({ nullable: true })
  @IsNumber()
  price: number | null;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  @IsOptional()
  ratingCount?: number;

  @ApiProperty({ default: 1 })
  @IsNumber()
  storeId: number;
}
