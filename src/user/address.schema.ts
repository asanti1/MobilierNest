import { IsOptional, IsString } from 'class-validator';

export class Address {
  @IsString()
  @IsOptional()
  addressId?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  street: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  roomNumber?: string;
}
