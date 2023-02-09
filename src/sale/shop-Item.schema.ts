import { Prop } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShopItem {
  @IsString()
  @Prop({ required: true })
  furnitureId: string;

  @IsString()
  @Prop({ required: true })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  finalCost: number;

  @IsNumber()
  @Prop({ required: true })
  costPerItem: number;
}
