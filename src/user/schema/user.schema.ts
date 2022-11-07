import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true, unique: true })
  emailAddress: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  isEmailVerfied: boolean;

  @Prop({ default: false })
  isPhoneNumberVerified: boolean;

  @Prop({ type: AddressSchema })
  address: Address;

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Address[];

  @Prop({ type: [String], default: [] })
  whitelistedRefreshTokens: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
