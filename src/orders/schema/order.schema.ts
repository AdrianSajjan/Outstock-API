import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schema';
import { Cart } from '../../cart/schema';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  Created = 'created',
  Placed = 'placed',
  Cancelled = 'cancelled',
  Failed = 'failed',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Cart.name })
  cart: Cart;

  @Prop()
  oid: string;

  @Prop()
  fullName: string;

  @Prop()
  emailAddress: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  state: string;

  @Prop()
  pinCode: string;

  @Prop()
  addressLineOne: string;

  @Prop()
  addressLineTwo?: string;

  @Prop()
  cityOrDistrict: string;

  @Prop()
  totalAmount: number;

  @Prop({ type: String, enum: ['created', 'placed', 'cancelled', 'failed'], default: 'created' })
  status: OrderStatus;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
