import { ApiProperty } from '@nestjs/swagger';
import { CartItem } from '@prisma/client';

export class CartItemEntity implements CartItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
