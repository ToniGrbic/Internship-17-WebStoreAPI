import { ApiProperty } from '@nestjs/swagger';
import { Cart, Order } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  ratingId: number;

  @ApiProperty()
  storeId: number;
}
