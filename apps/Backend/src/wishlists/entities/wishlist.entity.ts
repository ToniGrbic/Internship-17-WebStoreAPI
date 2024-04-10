import { ApiProperty } from '@nestjs/swagger';
import { WishListItem } from '@prisma/client';

export class WishListEntity implements WishListItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
