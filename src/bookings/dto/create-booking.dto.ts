import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: 'abc123',
    description: 'Unique identifier for the booking (optional)',
  })
  booking_id?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the person making the booking',
  })
  full_name: string;

  @IsEnum(['one way', 'outstation', 'local'])
  @ApiProperty({
    example: 'one way',
    description: 'Type of booking, can be "one way", "outstation", or "local"',
  })
  booking_type: 'one way' | 'outstation' | 'local';

  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Indicates if the booking is local',
  })
  is_booking_local: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'car123',
    description: 'Identifier for the car being booked',
  })
  car_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '123 Main St, Cityville',
    description: 'Location where the car will be picked up',
  })
  pickup_location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '456 Elm St, Townsville',
    description: 'Location where the car will be dropped off',
  })
  drop_location: string;

  @IsNumber()
  @ApiProperty({
    example: 1688497305,
    description: 'Unix timestamp for the pickup date and time',
  })
  pickup_date_and_time: number;

  @IsNumber()
  @ApiProperty({
    example: 1688583705,
    description: 'Unix timestamp for the drop-off date and time',
  })
  drop_date_and_time: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '150',
    description: 'Total kilometers to be traveled (optional)',
  })
  total_km?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 50,
    description: 'Estimated cost of fuel (optional)',
  })
  fuel_cost?: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 300,
    description: 'Total amount to be paid for the booking',
  })
  total_amount: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 100,
    description: 'Amount paid so far (optional)',
  })
  paid_amount?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 200,
    description: 'Remaining balance to be paid (optional)',
  })
  balance_amount?: number;

  @IsEnum(['cash', 'bank'])
  @ApiProperty({
    example: 'cash',
    description: 'Mode of payment, can be "cash" or "bank"',
  })
  payment_mode: 'cash' | 'bank';

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1688497305,
    description: 'Unix timestamp when the booking was created',
  })
  created_at: number;
}
