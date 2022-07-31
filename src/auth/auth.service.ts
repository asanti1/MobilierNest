import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.schema';
import { AuthRepository } from './auth.repository';
import { JwtPayload } from './dto/jwt-payload.dto';
import { LoginCredentials } from './dto/login-credentials.dto';
import { InvalidCredentials } from './exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(loginCreds: LoginCredentials): Promise<any> {
    const user = await this.validateUser(loginCreds);

    const payload: JwtPayload = user;
    return {
      accessToken: this.jwtService.sign({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        roles: payload.roles,
      }),
    };
  }

  async register(user: User): Promise<void> {
    this.authRepository.register(user);
  }

  async validateUser({ email, password }: LoginCredentials): Promise<User> {
    const user = await this.authRepository.getUserByEmail(email);

    console.log(email, password);

    if (!user) {
      throw new InvalidCredentials(
        `Your email and/or password are wrong, check them again`,
      );
    }

    if (await !bcrypt.compare(password, user.password)) {
      throw new InvalidCredentials(
        `Your email and/or password are wrong, check them again`,
      );
    }

    console.log(await bcrypt.compare(password, user.password));

    return user;
  }
}
