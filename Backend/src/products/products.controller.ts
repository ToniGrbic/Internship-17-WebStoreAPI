import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { UserAuthGuard } from 'src/users/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/users/guards/admin-auth.guard';

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({ type: ProductEntity })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findAll() {
    return this.productsService.findAll();
  }

  @Get('search')
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  findByName(@Query('title') title: string) {
    return this.productsService.findByName(title);
  }

  @Get(':id')
  @ApiOkResponse({ type: ProductEntity })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
