import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsOptional()
  booking_id?: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(['one way', 'outstation', 'local'])
  booking_type: 'one way' | 'outstation' | 'local';

  @IsBoolean()
  is_booking_local: boolean;

  @IsString()
  @IsNotEmpty()
  car_id: string;

  @IsString()
  @IsNotEmpty()
  pickup_location: string;

  @IsString()
  @IsNotEmpty()
  drop_location: string;

  @IsNumber()
  pickup_date_and_time: number;

  @IsNumber()
  drop_date_and_time: number;

  @IsString()
  @IsOptional()
  total_km?: string;

  @IsNumber()
  @IsOptional()
  fuel_cost?: number;

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @IsNumber()
  @IsOptional()
  paid_amount?: number;

  @IsNumber()
  @IsOptional()
  balance_amount?: number;

  @IsEnum(['cash', 'bank'])
  payment_mode: 'cash' | 'bank';

  @IsNumber()
  created_at: number;
}
