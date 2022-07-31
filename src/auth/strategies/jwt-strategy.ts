/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Response } from 'express';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User, UserDocument } from '../../user/user.schema';
import { LoginCredentials } from '../dto/login-credentials.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(loginCreds: LoginCredentials): Promise<any> {
    const { email } = loginCreds;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    };
  }
}
