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

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  @Length(4, 20)
  username?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  first_name?: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  last_name?: string;

  @IsString()
  @IsOptional()
  company_name?: string;

  @IsNumber()
  @IsOptional()
  @Min(18)
  @Max(120)
  age?: number;

  @IsNumber()
  @IsOptional()
  in_business_since?: number;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  @Length(6, 100)
  password?: string;

  @IsBoolean()
  @IsOptional()
  is_subscription_active?: boolean;

  @IsString()
  @IsOptional()
  plan?: string;

  @IsBoolean()
  @IsOptional()
  is_online?: boolean;

  @IsNumber()
  @IsOptional()
  last_login?: number;

  @IsNumber()
  @IsOptional()
  created_at?: number;
}