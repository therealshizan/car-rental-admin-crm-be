import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class signInDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'username of the user',
  })
  @IsNotEmpty()
  username?: string;

  @ApiProperty({
    example: '*******',
    description: 'password of the user',
  })
  @IsNotEmpty()
  password?: string;
}
