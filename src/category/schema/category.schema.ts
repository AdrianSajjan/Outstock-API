import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: number;

  @Prop()
  root: boolean;

  @Prop({ type: mongoose.Types.ObjectId, ref: Category.name })
  parent?: this;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
