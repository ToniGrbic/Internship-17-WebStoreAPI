import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/cart-items.module';
import { CartItemsController } from './carts/cart-items.controller';
import { CartItemsService } from './carts/cart-items.service';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    CartsModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    CartItemsController,
  ],
  providers: [AppService, ProductsService, UsersService, CartItemsService],
})
export class AppModule {}
