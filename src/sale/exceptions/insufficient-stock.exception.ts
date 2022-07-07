import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockException extends HttpException {
  constructor(description?: string) {
    super(description, HttpStatus.BAD_REQUEST);
  }
}
