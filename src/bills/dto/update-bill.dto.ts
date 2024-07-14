import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

// --------------------------------------------------------------------------------

export class UpdateBillDto {
  id?: string;

  @ApiProperty({
    example: '1627356482',
    description: 'The Unix timestamp of the date of issue',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  date_of_issue?: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the person',
    required: false,
  })
  @IsOptional()
  @IsString()
  full_name?: string;

  @ApiProperty({
    example: '123 Main St, Springfield, USA',
    description: 'The address of the person',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'Toyota Prius',
    description: 'The car associated with the bill',
    required: false,
  })
  @IsOptional()
  @IsString()
  car?: string;

  @ApiProperty({
    example: 'ABC1234',
    description: 'The vehicle number',
    required: false,
  })
  @IsOptional()
  @IsString()
  vehicle_no?: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'The pickup location',
    required: false,
  })
  @IsOptional()
  @IsString()
  pickup_location?: string;

  @ApiProperty({
    example: '456 Elm St',
    description: 'The drop location',
    required: false,
  })
  @IsOptional()
  @IsString()
  drop_location?: string;

  @ApiProperty({
    example: 1627356482,
    description: 'The Unix timestamp of the pickup date and time',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pickup_date_and_time?: number;

  @ApiProperty({
    example: 1627356482,
    description: 'The Unix timestamp of the drop date and time',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  drop_date_and_time?: number;

  @ApiProperty({
    example: '29AABCU9603R1ZM',
    description: 'The GSTIN/UIN of the person',
    required: false,
  })
  @IsOptional()
  @IsString()
  gstin_uin?: string;

  @ApiProperty({
    example: 29,
    description: 'The state code of the person',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  state_code?: number;

  @ApiProperty({
    example: 'one way',
    description: 'The type of booking',
    enum: ['one way', 'outstation', 'local'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['one way', 'outstation', 'local'])
  booking_type?: 'one way' | 'outstation' | 'local';

  @ApiProperty({
    example: '100',
    description: 'The total kilometers for the trip',
    required: false,
  })
  @IsOptional()
  @IsString()
  total_km?: string;

  @ApiProperty({
    example: 50,
    description: 'The cost of fuel for the trip',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fuel_cost?: number;

  @ApiProperty({
    example: 1000,
    description: 'The total amount for the bill',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  total_amount?: number;

  @ApiProperty({
    example: 'percentage',
    description: 'The type of discount applied',
    enum: ['percentage', 'flat'],
    required: false,
  })
  @IsOptional()
  @IsEnum(['percentage', 'flat'])
  discount_type?: 'percentage' | 'flat';

  @ApiProperty({
    example: 10,
    description: 'The value of the discount',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  discount_value?: number;

  @ApiProperty({
    example: 900,
    description: 'The discounted amount after applying the discount',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  discounted_amount?: number;

  @ApiProperty({
    example: 'paid',
    description: 'The status of the bill',
    enum: ['paid', 'unpaid'],
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: 'paid' | 'unpaid';

  created_at?: number;
}
