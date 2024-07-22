import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { signInDto } from './dto/sign-in.dto';
import { Public } from './public-strategy';
import { AuthGuard } from './auth.guard.';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  signIn(@Body() signInDto: signInDto) {
    console.log('signInDto ', signInDto)
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User Profile' })
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User Logout' })
  logout(@Request() req) {
    const token = req.headers.authorization.split(' ')[1];
    this.authService.addToken(token);
    return { message: 'Successfully logged out' };
  }
}
