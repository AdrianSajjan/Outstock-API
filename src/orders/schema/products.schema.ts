import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../../product/schema';

export type ProductsDocument = Products & Document;

@Schema({ _id: false })
export class Products {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  product: ProductDocument;

  @Prop()
  size?: string;

  @Prop()
  quantity: number;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
