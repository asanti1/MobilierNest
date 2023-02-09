import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model, mongo } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { LoginCredentials } from '../auth/dto/login-credentials.dto';
import { Role } from '../auth/interfaces/roles.enum';
import { Address } from './address.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { ModifyAddressDto } from './dto/modify-address.dto';

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
    if (user.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
    }

    const userToUpdate = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      projection: {
        password: 0,
        roles: 0,
        address: 0,
        firstName: 0,
        lastName: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    });

    if (!userToUpdate)
      throw new NotFoundException(`user with id of: ${id} not found`);
    return userToUpdate;
  }

  async addAnAddress(id: string, address: Address): Promise<UserDocument> {
    const userFound = await this.userModel.findById(id);

    if (!userFound)
      throw new NotFoundException(`user with id of: ${id} not found`);

    address.addressId = new mongoose.Types.ObjectId().toHexString();

    userFound.address.push(address);

    return await userFound.save();
  }

  async modifyAnAddressById(
    userId: string,
    addressToModify: ModifyAddressDto,
  ): Promise<void> {
    const { addressId, ...address } = addressToModify;

    const userFound = await this.userModel.findById(userId);

    if (!userFound)
      throw new NotFoundException(`user with id of: ${userId} not found`);

    let x: Address;

    userFound.address.forEach((add) => {
      if (add.addressId === addressToModify.addressId) {
        x = { ...add, ...address };
      }
    });

    const finalUser = await this.userModel
      .findByIdAndUpdate(userId, {
        $pull: { address: { addressId: addressId } },
      })
      .exec();

    finalUser.address.push(x);

    await finalUser.save();

    return await this.userModel.findById(userId);
  }

  async deleteAddressById(userId, addressId: string): Promise<void> {
    const userFound = await this.userModel.findByIdAndUpdate(userId, {
      $pull: { address: { addressId: addressId } },
    });
    if (!userFound)
      throw new NotFoundException(`user with id of: ${userId} not found`);

    await userFound.save();

    return;
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
