import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createCartDto: CreateCartItemDto) {
    return this.prisma.cartItem.create({ data: { userId, ...createCartDto } });
  }

  findByUserId(id: number) {
    return this.prisma.cartItem.findMany({ where: { userId: id } });
  }

  remove(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
