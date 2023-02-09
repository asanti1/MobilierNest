import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

import { AuthWithSameIdChecker } from '../auth/decorators/auth-with-same-id-checker.decorator';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/interfaces/roles.enum';
import { ParseObjectIdPipe } from '../pipes/string-to-objectid.pipe';
import { Address } from './address.schema';
import { DeleteAddressDto } from './dto/delete-address.dto';
import { ModifyAddressDto } from './dto/modify-address.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Auth(Role.ADMIN)
  createUser(@Body() user: User): Promise<UserDocument> {
    return this.userService.createUser(user);
  }

  @Get()
  @Auth(Role.ADMIN)
  getUsers(): Promise<UserDocument[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  getUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserDocument> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  modifiyAUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.modifiyAUserById(id, user);
  }

  @Put('/:id')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  addAnAddress(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() address: Address,
  ): Promise<UserDocument> {
    return this.userService.addAnAddress(id, address);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put('address/:id')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  modifyAnAddressById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() address: ModifyAddressDto,
  ): Promise<void> {
    return this.userService.modifyAnAddressById(id, address);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  @Auth(Role.ADMIN)
  deleteUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<void> {
    return this.userService.deleteUserById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('address/:id/:addressId')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  deleteAddressById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Param('addressId') addressId: string,
  ): Promise<void> {
    return this.userService.deleteAddressById(id, addressId);
  }
}
