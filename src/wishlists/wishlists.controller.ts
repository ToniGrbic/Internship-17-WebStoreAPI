import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WishListEntity } from './entities/wishlist.entity';

@Controller('wishlists')
@ApiTags('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @ApiCreatedResponse({ type: WishListEntity })
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':userId')
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findByUserId(@Param('userId') userId: string) {
    return this.wishlistsService.findByUserId(+userId);
  }

  @Delete(':id')
  @ApiOkResponse({ type: WishListEntity })
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
