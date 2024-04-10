import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { WishListEntity } from './entities/wishlist.entity';
import { UserAuthGuard } from 'src/users/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/users/guards/admin-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('wishlists')
@ApiTags('wishlists')
@ApiBearerAuth()
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: WishListEntity })
  create(@Req() { user }, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(user.id, createWishlistDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findUserWishlist(@Req() { user }) {
    return this.wishlistsService.findByUserId(user.id);
  }

  @Get(':userId')
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.wishlistsService.findByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: WishListEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.wishlistsService.remove(id);
  }
}
