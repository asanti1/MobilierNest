import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentials extends HttpException {
  constructor(description?: string) {
    super(description, HttpStatus.UNAUTHORIZED);
  }
}
