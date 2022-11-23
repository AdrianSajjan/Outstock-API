import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductCategoryDocument, ProductCategorySchema } from './product-category.schema';

export type ProductDocument = Product & Document;

@Schema({ toJSON: { virtuals: true } })
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

  @Prop({ type: ProductCategorySchema })
  category: ProductCategoryDocument;

  @Prop({ type: [ProductCategorySchema] })
  subcategory: Array<ProductCategoryDocument>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
