import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { User, UserDocument } from '../user/user.schema';
import { Role } from './interfaces/roles.enum';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async register(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(user.password, salt);

    user.password = hashedPassword;

    const userToBeCreated = await this.userModel.create(user);
    userToBeCreated.roles = [Role.USER];
    return await userToBeCreated.save();
  }
}
