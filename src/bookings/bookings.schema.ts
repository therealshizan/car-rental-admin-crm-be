import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

// ------------------------------------------------------------------------------------

@Schema()
export class Bookings extends Document {
  @Prop()
  booking_id?: string;

  @Prop()
  full_name: string;

  @Prop()
  booking_type: 'one way' | 'outstation' | 'local';

  @Prop()
  is_booking_local: boolean;

  @Prop()
  car_id: string;

  @Prop()
  pickup_location: string;

  @Prop()
  drop_location: string;

  @Prop()
  pickup_date_and_time: number;

  @Prop()
  drop_date_and_time: number;

  @Prop()
  total_km: string;

  @Prop()
  fuel_cost: number;

  @Prop()
  total_amount: number;

  @Prop()
  paid_amount: number;

  @Prop()
  balance_amount: number;

  @Prop()
  payment_mode: 'cash' | 'bank';

  @Prop()
  created_at: number;
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
