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
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CartItemEntity } from './entities/cart.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/users/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/users/guards/admin-auth.guard';

@Controller('cart-items')
@ApiTags('cart items')
@ApiBearerAuth()
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: CartItemEntity })
  create(@Req() { user }, @Body() createCartDto: CreateCartItemDto) {
    return this.cartItemsService.create(user.id, createCartDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: CartItemEntity, isArray: true })
  findUserCart(@Req() { user }) {
    return this.cartItemsService.findByUserId(user.id);
  }

  @Get(':userId')
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: CartItemEntity, isArray: true })
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartItemsService.findByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: CartItemEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemsService.remove(id);
  }

  @Delete()
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: CartItemEntity })
  removeAllForUser(@Req() { user }) {
    return this.cartItemsService.removeAllForUser(user.id);
  }
}
