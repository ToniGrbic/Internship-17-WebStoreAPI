import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CartItemEntity } from './entities/cart.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/users/guards/user-auth.guard';

@Controller('cart-items')
@ApiTags('cart items')
@ApiBearerAuth()
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: CartItemEntity })
  create(@Body() createCartDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartDto);
  }

  @Get(':userId')
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: CartItemEntity, isArray: true })
  findByUserId(@Param('userId') userId: string) {
    return this.cartItemsService.findByUserId(+userId);
  }

  @Delete(':id')
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: CartItemEntity })
  remove(@Param('id') id: string) {
    return this.cartItemsService.remove(+id);
  }
}
