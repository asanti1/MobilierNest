import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShopItem {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
