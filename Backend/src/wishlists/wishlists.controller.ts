import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
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
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get(':userId')
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: WishListEntity, isArray: true })
  findByUserId(@Param('userId') userId: string) {
    return this.wishlistsService.findByUserId(+userId);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: WishListEntity })
  remove(@Param('id') id: string) {
    return this.wishlistsService.remove(+id);
  }
}
