import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from '../../user/schema';
import { Product } from '../../product/schema';
import { CartItem, CartItemSchema } from './item.schema';

export type CartDocument = Cart & Document;

export enum CartStatus {
  Active = 'active',
  Saved = 'saved',
  Orderded = 'ordered',
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: String, enum: ['active', 'saved', 'ordered'], default: 'active' })
  status: CartStatus;

  @Prop({ type: Number, default: 0 })
  totalQuantity: number;

  @Prop({ type: Boolean, default: true })
  isActive: boolean;

  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop({ type: [CartItemSchema] })
  items: Array<CartItem>;

  @Prop()
  createAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
