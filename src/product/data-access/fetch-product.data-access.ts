import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class PriceQueryData {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  $lt: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  $gt: number;
}

export class FetchProductQueryData {
  @IsEmail()
  category: string;

  @IsEmail()
  subcategory: string;

  @IsArray()
  price: Partial<PriceQueryData>;
}
