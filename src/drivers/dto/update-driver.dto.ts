// src/drivers/dto/update-driver.dto.ts

import { IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDriverDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the driver',
    required: false,
  })
  @IsOptional()
  @IsString()
  driver_name?: string;

  @ApiProperty({
    example: 'DL12345678',
    description: 'The unique license number of the driver',
    required: false,
  })
  @IsOptional()
  @IsString()
  license_no?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The unique phone number of the driver',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone_no?: string;

  @ApiProperty({
    example: '123 Main St, Springfield, USA',
    description: 'The address of the driver',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: ['document1.pdf', 'document2.pdf'],
    description:
      'An optional array of document filenames related to the driver',
    required: false,
  })
  @IsOptional()
  @IsArray()
  documents?: string[];
}
