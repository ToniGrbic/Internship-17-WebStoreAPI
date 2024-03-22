import { Order } from '@prisma/client';
export class OrderEntity implements Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
