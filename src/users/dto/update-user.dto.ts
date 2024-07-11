import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEmail,
  IsOptional,
  Length,
  Min,
  Max,
} from 'class-validator';

// ------------------------------------------------------------------------------------

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @Length(4, 20)
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username Of The User',
  })
  username?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  @ApiProperty({ example: 'John', description: 'First Name Of The User' })
  first_name?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  @ApiProperty({ example: 'Doe', description: 'Last Name Of The User' })
  last_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Global Nexus Of Car Rentals',
    description: 'Company Name Of The User',
  })
  company_name?: string;

  @IsNumber()
  @IsOptional()
  @Min(18)
  @Max(120)
  @ApiProperty({ example: 25, description: 'Age Of The User' })
  age?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1688497305,
    description:
      'Unix Timestamp Representing The Date And Time The Business Started Operations',
  })
  in_business_since?: number;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'The Email Address Of The User',
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '9876543210',
    description: 'The Phone No Of The User',
  })
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(6, 100)
  @ApiProperty({
    example: '**********',
    description: 'The Encrypted Password Of The User',
  })
  password?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: "Indicates If The User's Subscription Is Active",
  })
  is_subscription_active?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'premium',
    description: 'The Subscription Plan Of The User',
  })
  plan?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'Indicates If The User Is Currently Online',
  })
  is_online?: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1688497305,
    description: "Unix Timestamp Of The User's Last Login",
  })
  last_login?: number;
}
