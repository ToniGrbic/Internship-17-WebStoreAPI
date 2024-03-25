import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: false })
  image?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  rating?: number;

  @ApiProperty()
  ratingCount?: number;

  @ApiProperty({ default: 1 })
  storeId: number;
}
