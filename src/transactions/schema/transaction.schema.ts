import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schema';
import { Order } from '../../orders/schema';

export type TransactionDocument = Transaction & Document;

export enum PaymentType {
  UPI = 'upi',
  Card = 'card',
}

export enum PaymentStatus {
  Created = 'created',
  Authorized = 'authorized',
  Captured = 'captured',
  Refunded = 'refunded',
  Failed = 'failed',
}

export enum RefundStatus {
  NA = 'n/a',
  Full = 'full',
  Partial = 'partial',
  Failed = 'failed',
}

export interface Card {
  lastFourDigits: number;
  network: string;
  type: string;
  subType?: string;
}

export interface TransactionError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
}

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: User;

  // To prevent circular dependency issue
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order' })
  order: Order;

  @Prop()
  paymentID: string;

  @Prop()
  amount: number;

  @Prop()
  invoiceID: string;

  @Prop(raw({ lastFourDigits: String, network: String, type: String, subType: String }))
  card?: Card;

  @Prop({ type: String, enum: ['created', 'authorized', 'captured', 'refunded', 'failed'], default: 'created' })
  paymentStatus: PaymentStatus;

  @Prop()
  emailAddress: string;

  @Prop({ type: String, enum: ['full', 'partial', 'failed'] })
  refundStatus?: RefundStatus;

  @Prop()
  refundAmount?: number;

  @Prop(raw({ code: String, description: String, source: String, step: String, reason: String }))
  error?: TransactionError;

  @Prop()
  phoneNumber: string;

  @Prop({ type: String, enum: ['upi', 'card'] })
  type: PaymentType;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
