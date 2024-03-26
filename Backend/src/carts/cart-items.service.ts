import { Injectable } from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  create(createCartDto: CreateCartItemDto) {
    return this.prisma.cartItem.create({ data: createCartDto });
  }

  findAll() {
    return this.prisma.cartItem.findMany();
  }

  findByUserId(id: number) {
    return this.prisma.cartItem.findMany({ where: { userId: id } });
  }

  remove(id: number) {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
