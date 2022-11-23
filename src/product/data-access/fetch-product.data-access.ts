import { parseJson } from '../../shared/lib';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class PriceQueryData {
  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  $lt: number;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  $gt: number;
}

export class SortQueryData {
  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  createdAt: number;

  @IsOptional()
  @IsNumberString()
  @Type(() => Number)
  @IsNumber()
  price: number;
}
export class FetchProductQueryData {
  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  subcategory: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Transform(parseJson, { toClassOnly: true })
  @Type(() => SortQueryData)
  @IsObject()
  @IsNotEmpty()
  sort: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Transform(parseJson, { toClassOnly: true })
  @Type(() => PriceQueryData)
  @IsArray()
  @IsNotEmpty()
  price: Array<PriceQueryData>;
}
