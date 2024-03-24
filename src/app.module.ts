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
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishlistsController } from './wishlists/wishlists.controller';
import { WishlistsService } from './wishlists/wishlists.service';

@Module({
  imports: [
    PrismaModule,
    ProductsModule,
    UsersModule,
    OrdersModule,
    CartsModule,
    WishlistsModule,
  ],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    CartItemsController,
    WishlistsController,
  ],
  providers: [
    AppService,
    ProductsService,
    UsersService,
    CartItemsService,
    WishlistsService,
  ],
})
export class AppModule {}
