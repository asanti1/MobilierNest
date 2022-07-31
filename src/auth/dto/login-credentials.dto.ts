import { IsEmail } from 'class-validator';

export class LoginCredentials {
  @IsEmail()
  email: string;

  password: string;
}
