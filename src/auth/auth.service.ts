import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.schema';
import { AuthRepository } from './auth.repository';
import { CompleteToken } from './dto/complete-token.dto';
import { LoginCredentials } from './dto/login-credentials.dto';
import { RefreshToken } from './dto/refresh-token.dto';
import { InvalidCredentials } from './exceptions/invalid-credentials.exception';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async login(loginCreds: LoginCredentials): Promise<CompleteToken> {
    const user = await this.validateUser(loginCreds);
    return await this.createToken(user);
  }

  async register(user: User): Promise<CompleteToken> {
    const createdUser = await this.authRepository.register(user);
    return this.createToken(createdUser);
  }

  async refreshToken(loginCreds: LoginCredentials): Promise<RefreshToken> {
    const user = await this.validateUser(loginCreds);
    return this.createRefreshToken(user);
  }

  private async validateUser({
    email,
    password,
  }: LoginCredentials): Promise<User> {
    const user = await this.authRepository.getUserByEmail(email);

    if (!user) {
      throw new InvalidCredentials(
        `Your email and/or password are wrong, try again`,
      );
    }
    let resp = '';
    await bcrypt.compare(password, user.password).then((res) => {
      resp = res;
    });

    if (!resp)
      throw new InvalidCredentials(
        `Your email and/or password are wrong, try again`,
      );

    return user;
  }

  private createToken(user: User): CompleteToken {
    const payload: CompleteToken = {
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
        roles: user.roles,
        _id: user['_id'],
      },
      accessToken: this.jwtService.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      }),
    };
    return payload;
  }

  private createRefreshToken(user: User): RefreshToken {
    const payload: RefreshToken = {
      accessToken: this.jwtService.sign({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles,
      }),
    };
    return payload;
  }
}
