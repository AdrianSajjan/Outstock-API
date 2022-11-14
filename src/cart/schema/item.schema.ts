import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../product/schema';

@Schema({ _id: true })
export class CartItem {
  _id?: any;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  product: Product;

  @Prop()
  size?: string;

  @Prop()
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
