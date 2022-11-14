import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateProductData {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  description: string;

  @Transform(() => Number)
  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: string;
}
