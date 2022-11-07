import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: true })
export class Address {
  _id?: any;

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
}

export const AddressSchema = SchemaFactory.createForClass(Address);
