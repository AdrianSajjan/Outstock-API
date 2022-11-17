import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Product, ProductDocument } from '../../product/schema';

@Schema({ _id: true })
export class CartItem {
  _id?: any;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  product: ProductDocument;

  @Prop()
  size?: string;

  @Prop()
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
