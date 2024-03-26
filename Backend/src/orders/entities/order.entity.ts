import { Order } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class OrderEntity implements Order {
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
