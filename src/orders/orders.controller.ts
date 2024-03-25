import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiCreatedResponse({ type: OrderEntity })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderEntity })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get('/user/:userId')
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findByUserId(@Param('userId') userId: string) {
    return this.ordersService.findByUserId(+userId);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: OrderEntity })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderEntity })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}