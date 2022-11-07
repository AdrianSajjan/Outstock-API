import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  emailAddress: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop()
  hashedRefreshToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
