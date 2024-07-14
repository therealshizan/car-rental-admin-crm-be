import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

import { getCurrentUnix } from 'src/lib/date-utils';

// -----------------------------------------------------------------------

@Schema()
export class Bill extends Document {
  @Prop()
  id?: string;

  @Prop({ required: true })
  booking_id?: string;

  @Prop({ required: true, default: getCurrentUnix })
  date_of_issue: number;

  @Prop({ required: true })
  full_name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  car: string;

  @Prop({ required: true })
  vehicle_no: string;

  @Prop({ required: true })
  pickup_location: string;

  @Prop({ required: true })
  drop_location: string;

  @Prop({ required: true })
  pickup_date_and_time: number;

  @Prop({ required: true })
  drop_date_and_time: number;

  @Prop({ required: true })
  gstin_uin: string;

  @Prop({ required: true })
  state_code: number;

  @Prop({ required: true, enum: ['one way', 'outstation', 'local'] })
  booking_type: 'one way' | 'outstation' | 'local';

  @Prop({ required: true })
  total_km: string;

  @Prop({ required: true })
  fuel_cost: number;

  @Prop({ required: true })
  total_amount: number;

  @Prop({ required: true, enum: ['percentage', 'flat'] })
  discount_type: 'percentage' | 'flat';

  @Prop({ required: true })
  discount_value: number;

  @Prop({ required: true })
  discounted_amount: number;

  @Prop({ required: true, enum: ['paid', 'unpaid'] })
  status: 'paid' | 'unpaid';

  @Prop({ required: true, default: getCurrentUnix })
  created_at: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
