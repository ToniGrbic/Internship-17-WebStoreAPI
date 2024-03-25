import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CartItemEntity } from './entities/cart.entity';

@Controller('cart-items')
@ApiTags('cart items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiCreatedResponse({ type: CartItemEntity })
  create(@Body() createCartDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartDto);
  }

  @Get(':userId')
  @ApiOkResponse({ type: CartItemEntity, isArray: true })
  findByUserId(@Param('userId') userId: string) {
    return this.cartItemsService.findByUserId(+userId);
  }

  @Delete(':id')
  @ApiCreatedResponse({ type: CartItemEntity })
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
