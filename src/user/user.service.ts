import { Inject, Injectable } from '@nestjs/common';

import { LoginCredentials } from '../auth/dto/login-credentials.dto';
import { Address } from './address.schema';
import { ModifyAddressDto } from './dto/modify-address.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  createUser(user: User): Promise<UserDocument> {
    return this.userRepository.createUser(user);
  }

  getUsers(): Promise<UserDocument[]> {
    return this.userRepository.getUsers();
  }

  getUserById(id: string): Promise<UserDocument> {
    return this.userRepository.getUserById(id);
  }

  modifiyAUserById(id: string, user: UpdateUserDto): Promise<UserDocument> {
    return this.userRepository.modifiyAUserById(id, user);
  }

  addAnAddress(id: string, address: Address): Promise<UserDocument> {
    return this.userRepository.addAnAddress(id, address);
  }

  deleteUserById(id: string): Promise<void> {
    return this.userRepository.deleteUserById(id);
  }

  getUserByEmail(loginCreds: LoginCredentials) {
    return this.userRepository.getUserByEmail(loginCreds);
  }

  modifyAnAddressById(id: string, address: ModifyAddressDto): Promise<void> {
    return this.userRepository.modifyAnAddressById(id, address);
  }

  deleteAddressById(id: string, addressId: string): Promise<void> {
    return this.userRepository.deleteAddressById(id, addressId);
  }
}
