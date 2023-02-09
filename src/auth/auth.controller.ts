import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from '../user/user.schema';
import { AuthService } from './auth.service';
import { CompleteToken } from './dto/complete-token.dto';
import { LoginCredentials } from './dto/login-credentials.dto';
import { RefreshToken } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginCred: LoginCredentials): Promise<CompleteToken> {
    return this.authService.login(loginCred);
  }

  @Post('register')
  register(@Body() user: User): Promise<CompleteToken> {
    return this.authService.register(user);
  }

  @Post('tokenRefresh')
  tokenRefresh(@Body() loginCred: LoginCredentials): Promise<RefreshToken> {
    return this.authService.refreshToken(loginCred);
  }
}
