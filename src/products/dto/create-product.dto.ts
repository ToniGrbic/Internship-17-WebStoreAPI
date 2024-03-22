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
  ratingId: number;

  @ApiProperty()
  storeId: number;
}
