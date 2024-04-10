import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { OrderEntity } from './entities/order.entity';
import { UserAuthGuard } from 'src/users/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/users/guards/admin-auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('orders')
@ApiTags('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(UserAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  create(@Req() { user }, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findUserOrders(@Req() { user }) {
    return this.ordersService.findByUserId(user.id);
  }

  @Get('/:userId')
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: OrderEntity, isArray: true })
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.ordersService.findByUserId(userId);
  }

  @Get(':id')
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: OrderEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
