import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { LoginCredentials } from '../auth/dto/login-credentials.dto';
import { Role } from '../auth/interfaces/roles.enum';
import { Address } from './address.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createUser(user: User): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    createdUser.roles = [Role.ADMIN];
    return await createdUser.save();
  }

  async getUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.aggregate().project({ password: 0 });

    return users;
  }

  async getUserById(id: string): Promise<UserDocument> {
    const findUser = await this.userModel.findById(id);

    return findUser;
  }

  async modifiyAUserById(
    id: string,
    user: UpdateUserDto,
  ): Promise<UserDocument> {
    const userToUpdate = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
    if (!userToUpdate)
      throw new NotFoundException(`user with id of: ${id} not found`);
    return userToUpdate;
  }

  async addAnAddress(id: string, address: Address): Promise<UserDocument> {
    const userFound = await this.userModel.findById(id);

    userFound.address.push(address);

    return await userFound.save();
  }

  async deleteUserById(id: string): Promise<void> {
    const deletedUser = await this.userModel.findOneAndDelete({ id });
    if (!deletedUser) {
      throw new NotFoundException(`user with id of: ${id} not found`);
    }
    return;
  }

  async getUserByEmail({ email }: LoginCredentials) {
    const user = await this.userModel.findOne({ email });
    return user;
  }
}
