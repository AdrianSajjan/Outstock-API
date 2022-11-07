import { Document } from 'mongoose';
import { Category } from './category.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ type: Object })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
