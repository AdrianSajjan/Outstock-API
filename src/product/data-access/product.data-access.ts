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

export class FetchProductData {
  page: number;
  limit: number;
  category: Array<string>;
  size: Array<string>;
  color: Array<string>;
  brand: Array<string>;
  minPrice: number;
  maxPrice: number;
}
