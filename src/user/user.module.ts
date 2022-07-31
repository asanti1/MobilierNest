import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthModule],
  exports: [UserService],
})
export class UserModule {}
