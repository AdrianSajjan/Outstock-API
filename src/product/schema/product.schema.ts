import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../../category/schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  sku: string;

  @Prop({ type: [String] })
  images: Array<string>;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  currency: string;

  @Prop({ type: [String] })
  gender: Array<string>;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  category: Category;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  subcategory: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
