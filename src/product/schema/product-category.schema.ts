import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ _id: false })
export class ProductCategory {
  @Prop()
  name: string;
  @Prop()
  code: number;
}

export const ProductCategorySchema = SchemaFactory.createForClass(ProductCategory);
