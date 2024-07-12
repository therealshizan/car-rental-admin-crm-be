import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { getCurrentUnix } from 'src/lib/date-utils';

// ------------------------------------------------------------------------------------

@Schema()
export class Driver extends Document {
  @Prop()
  id?: string;

  @Prop({ required: true })
  driver_name: string;

  @Prop({ required: true, unique: true })
  license_no: string;

  @Prop({ required: true, unique: true })
  phone_no: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  documents: string[];

  @Prop({ default: getCurrentUnix() })
  created_at?: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
