import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistsService {
  constructor(private prisma: PrismaService) {}

  create(userId: number, createWishlistDto: CreateWishlistDto) {
    return this.prisma.wishListItem.create({
      data: { userId, ...createWishlistDto },
    });
  }

  findByUserId(userId: number) {
    return this.prisma.wishListItem.findMany({ where: { userId } });
  }

  remove(id: number) {
    return this.prisma.wishListItem.delete({ where: { id } });
  }
}
