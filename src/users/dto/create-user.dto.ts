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

export class CreateUserDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @Length(4, 20)
  username: string;

  @IsString()
  @Length(2, 50)
  first_name: string;

  @IsString()
  @Length(2, 50)
  last_name: string;

  @IsString()
  company_name: string;

  @IsNumber()
  @Min(18)
  @Max(120)
  age: number;

  @IsNumber()
  in_business_since: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @Length(6, 100)
  password: string;

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
