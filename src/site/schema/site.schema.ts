import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SiteDocument = Site & Document;

@Schema()
export class Site {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  url: string;

  @Prop({ type: Object })
  data: any;
}

export const SiteSchema = SchemaFactory.createForClass(Site);
