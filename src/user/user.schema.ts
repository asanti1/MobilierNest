import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Address } from './address.schema';

export type UserDocument = Document & User;

@Schema({ timestamps: true })
export class User {
  @IsNotEmpty()
  @Prop({ required: true })
  firstName: string;

  @IsNotEmpty()
  @Prop({ required: true })
  lastName: string;

  @IsEmail()
  @Prop({ required: true })
  email: string;

  @IsNotEmpty()
  @Prop({ required: true })
  password: string;

  @Prop({ required: false, default: 's/n' })
  phone?: string;

  @Prop({ required: false })
  @IsOptional()
  address?: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
