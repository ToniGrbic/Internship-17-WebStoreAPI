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

@Module({
  imports: [PrismaModule, ProductsModule, UsersModule],
  controllers: [AppController, ProductsController, UsersController],
  providers: [AppService, ProductsService, UsersService],
})
export class AppModule {}
