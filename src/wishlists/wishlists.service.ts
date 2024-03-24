import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WishlistsService {
  constructor(private prisma: PrismaService) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.prisma.wishListItem.create({
      data: createWishlistDto,
    });
  }

  findAll() {
    return this.prisma.wishListItem.findMany();
  }

  findByUserId(userId: number) {
    return this.prisma.wishListItem.findMany({ where: { userId } });
  }

  remove(id: number) {
    return this.prisma.wishListItem.delete({ where: { id } });
  }
}
