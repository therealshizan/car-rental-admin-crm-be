import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

// ------------------------------------------------------------------------------------

const carTypeValues = ['suv', 'luxury', 'sedan', 'minivan'];

// ------------------------------------------------------------------------------------

@Schema()
export class Car extends Document {
  @Prop({ required: false })
  car_id?: string;

  @Prop({ required: true })
  car_name: string;

  @Prop({
    required: true,
    enum: carTypeValues,
    default: 'sedan',
  })
  car_type: 'suv' | 'luxury' | 'sedan' | 'minivan';

  @Prop({ required: true })
  vehicle_no: string;

  @Prop({ required: true })
  fuel_type: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: false })
  created_at?: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
