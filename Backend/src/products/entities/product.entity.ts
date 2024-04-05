import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ nullable: true })
  image: string | null;

  @ApiProperty()
  price: number;

  @ApiProperty()
  rating: number;

  @ApiProperty()
  ratingCount: number;

  @ApiProperty()
  storeId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
