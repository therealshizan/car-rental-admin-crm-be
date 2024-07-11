import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

// ------------------------------------------------------------------------------------

export class CreateDriverDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the driver',
    readOnly: true,
  })
  @IsOptional()
  @IsString()
  driver_id?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the driver',
  })
  @IsNotEmpty()
  @IsString()
  driver_name: string;

  @ApiProperty({
    example: 'DL12345678',
    description: 'The unique license number of the driver',
  })
  @IsNotEmpty()
  @IsString()
  license_no: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The unique phone number of the driver',
  })
  @IsNotEmpty()
  @IsString()
  phone_no: string;

  @ApiProperty({
    example: '123 Main St, Springfield, USA',
    description: 'The address of the driver',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

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
