import { IsNumber } from 'class-validator';

export class DeleteAddressDto {
  @IsNumber()
  id: number;
}
