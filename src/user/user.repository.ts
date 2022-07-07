import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './address.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<UserDocument> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async getUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.aggregate().project({ password: 0 });

    return users;
  }

  async getUserById(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException(`user with id of: ${id} not found`);

    return user;
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
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { address } },
      { new: true },
    );
    if (!user) throw new NotFoundException(`user with id of: ${id} not found`);
    return user;
  }

  async deleteUserById(id: string): Promise<void> {
    const deletedUser = await this.userModel.findOneAndDelete({ id });
    if (!deletedUser) {
      throw new NotFoundException(`user with id of: ${id} not found`);
    }
    return;
  }
}
