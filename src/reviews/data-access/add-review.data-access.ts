import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AddReviewData {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsOptional()
  comment: string;
}
