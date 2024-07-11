// src/cars/dto/create-car.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsIn,
  IsNumber,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({
    example: '',
    description: 'Car Unique Id',
  })
  @IsString()
  @IsOptional()
  car_id?: string;

  @ApiProperty({
    example: 'Tesla Model S',
    description: 'The name of the car',
  })
  @IsString()
  @IsNotEmpty()
  car_name: string;

  @ApiProperty({
    example: 'KA-01-MP-1234',
    description: 'The vehicle number of the car',
  })
  @IsString()
  @IsNotEmpty()
  vehicle_no: string;

  @ApiProperty({
    example: 'Electric',
    description: 'The type of fuel used by the car',
  })
  @IsString()
  @IsNotEmpty()
  fuel_type: string;

  @ApiProperty({
    example: 2023,
    description: 'The manufacturing year of the car',
  })
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty({
    example: 'sedan',
    description: 'The type of car (suv, luxury, sedan, minivan)',
    enum: ['suv', 'luxury', 'sedan', 'minivan'],
  })
  @IsString()
  @IsIn(['suv', 'luxury', 'sedan', 'minivan'])
  car_type: 'suv' | 'luxury' | 'sedan' | 'minivan';

  @ApiProperty({
    example: '2023-07-10T12:00:00Z',
    description: 'The date and time when the car record was created',
  })
  @IsNumber()
  @IsOptional()
  created_at?: number;
}
