import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { ShopItem } from './shop-Item.schema';

export type SaleDocument = Document & Sale;

@Schema({ timestamps: true })
export class Sale {
  @IsNotEmpty()
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  shopList: ShopItem[];
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
