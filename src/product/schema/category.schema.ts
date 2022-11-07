import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop()
  code: number;

  @Prop()
  gender: string;

  @Prop()
  parent: number;

  @Prop()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
