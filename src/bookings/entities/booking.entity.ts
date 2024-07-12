import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

// ------------------------------------------------------------------------------------

@Schema()
export class Bookings extends Document {
  @Prop({ required: false })
  id?: string;

  @Prop({ required: true })
  full_name: string;

  @Prop({
    required: true,
    enum: ['one way', 'outstation', 'local'],
    messsage: (props: any) => {
      'helloooo';
    },
  })
  booking_type: 'one way' | 'outstation' | 'local';

  @Prop({ required: true })
  is_booking_local: boolean;

  @Prop({ required: true })
  car_id: string;

  @Prop({ required: true })
  pickup_location: string;

  @Prop({ required: true })
  drop_location: string;

  @Prop({ required: true })
  pickup_date_and_time: number;

  @Prop({ required: true })
  drop_date_and_time: number;

  @Prop()
  total_km?: string;

  @Prop()
  fuel_cost?: number;

  @Prop({ required: true })
  total_amount: number;

  @Prop()
  paid_amount?: number;

  @Prop()
  balance_amount?: number;

  @Prop({ required: true, enum: ['cash', 'bank'] })
  payment_mode: 'cash' | 'bank';

  @Prop({ required: true })
  created_at: number;
}

export const BookingsSchema = SchemaFactory.createForClass(Bookings);
