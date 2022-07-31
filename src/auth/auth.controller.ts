import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../user/user.schema';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { LoginCredentials } from './dto/login-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginCred: LoginCredentials, @Req() request): Promise<any> {
    console.log(request.body);

    return this.authService.login(loginCred);
  }

  @Post('register')
  register(@Body() user: User): Promise<void> {
    return this.authService.register(user);
  }

  @Get('asd')
  @UseGuards(AuthGuard())
  privateRoute2(@GetUser() user: User) {
    console.log('asd');
    return {
      ok: true,
      user,
    };
  }
}
