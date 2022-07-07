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

import { ParseObjectIdPipe } from '../pipes/string-to-objectid.pipe';
import { Address } from './address.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: User): Promise<UserDocument> {
    return this.userService.createUser(user);
  }

  @Get()
  getUsers(): Promise<UserDocument[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<UserDocument> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id')
  modifiyAUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.modifiyAUserById(id, user);
  }

  @Put('/:id')
  addAnAddress(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() address: Address,
  ): Promise<UserDocument> {
    return this.userService.addAnAddress(id, address);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteUserById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<void> {
    return this.userService.deleteUserById(id);
  }
}
