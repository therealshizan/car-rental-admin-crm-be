import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { BILL_STATUS, BOOKING_TYPE, DISCOUNT_TYPE } from 'src/lib/global-enum';

// ------------------------------------------------------------------------------------------

export class CreateBillDto {
  id?: string;

  @ApiProperty({
    example: 'booking_1234abcd',
    description: 'ID of the booking for which the bill is created',
  })
  @IsNotEmpty()
  booking_id?: string;

  @ApiProperty({
    example: '1627356482',
    description: 'The Unix timestamp of the date of issue',
  })
  @IsNotEmpty()
  @IsNumber()
  date_of_issue: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the person',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '123 Main St, Springfield, USA',
    description: 'The address of the person',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Toyota Prius',
    description: 'The car associated with the bill',
  })
  @IsNotEmpty()
  @IsString()
  car: string;

  @ApiProperty({
    example: 'ABC1234',
    description: 'The vehicle number',
  })
  @IsNotEmpty()
  @IsString()
  vehicle_no: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The pickup location',
  })
  @IsNotEmpty()
  @IsString()
  pickup_location: string;

  @ApiProperty({
    example: '456 Elm St',
    description: 'The drop location',
  })
  @IsNotEmpty()
  @IsString()
  drop_location: string;

  @ApiProperty({
    example: 1627356482,
    description: 'The Unix timestamp of the pickup date and time',
  })
  @IsNotEmpty()
  @IsNumber()
  pickup_date_and_time: number;

  @ApiProperty({
    example: 1627356482,
    description: 'The Unix timestamp of the drop date and time',
  })
  @IsNotEmpty()
  @IsNumber()
  drop_date_and_time: number;

  @ApiProperty({
    example: '29AABCU9603R1ZM',
    description: 'The GSTIN/UIN of the person',
  })
  @IsNotEmpty()
  @IsString()
  gstin_uin: string;

  @ApiProperty({
    example: 29,
    description: 'The state code of the person',
  })
  @IsNotEmpty()
  @IsNumber()
  state_code: number;

  @ApiProperty({
    example: 'one way',
    description: 'The type of booking',
    enum: BOOKING_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(BOOKING_TYPE)
  booking_type: BOOKING_TYPE;

  @ApiProperty({
    example: 100,
    description: 'The total kilometers for the trip',
  })
  @IsNotEmpty()
  @IsNumber()
  total_km: number;

  @ApiProperty({
    example: 50,
    description: 'The cost of fuel for the trip',
  })
  @IsNotEmpty()
  @IsNumber()
  fuel_cost: number;

  @ApiProperty({
    example: 1000,
    description: 'The total amount for the bill',
  })
  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    example: 'percentage',
    description: 'The type of discount applied',
    enum: DISCOUNT_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(DISCOUNT_TYPE)
  discount_type: DISCOUNT_TYPE;

  @ApiProperty({
    example: 10,
    description: 'The value of the discount',
  })
  @IsNotEmpty()
  @IsNumber()
  discount_value: number;

  @ApiProperty({
    example: 900,
    description: 'The discounted amount after applying the discount',
  })
  @IsNotEmpty()
  @IsNumber()
  discounted_amount: number;

  @ApiProperty({
    example: 'paid',
    description: 'The status of the bill',
    enum: BILL_STATUS,
  })
  @IsNotEmpty()
  @IsEnum(BILL_STATUS)
  status: BILL_STATUS;
}
