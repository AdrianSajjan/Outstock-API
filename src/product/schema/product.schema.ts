import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../../category/schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  sku: string;

  @Prop({ type: [String] })
  images: Array<string>;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  gender: string;

  @Prop({ type: [CategorySchema] })
  category: Array<Category>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
