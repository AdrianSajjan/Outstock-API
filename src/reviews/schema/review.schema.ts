import { Schema as MongooseSchema, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserDocument } from '../../user/schema';
import { Product, ProductDocument } from '../../product/schema';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop()
  rating: number;

  @Prop()
  comment: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name })
  product: ProductDocument;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: UserDocument;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
