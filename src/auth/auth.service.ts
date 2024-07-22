import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import { IAuthInput, IAuthResult, ISignInData } from './auth.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: IAuthInput): Promise<IAuthResult | null> {
    const user = await this.validateUser(input);

    if (!user) throw new UnauthorizedException();

    return this.signIn(user);
  }

  async validateUser(input: IAuthInput): Promise<ISignInData | null> {
    const { username, password } = input;

    const user = await this.usersService.findWithUsername(username);

    if (user && user.password === password) {
      return {
        userId: user.id,
        username: username,
      };
    }
    return null;
  }

  async signIn(user: ISignInData): Promise<IAuthResult | null> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, userId: user.userId, username: user.username };
  }
}
