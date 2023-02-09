import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty } from 'class-validator';
import { SaleStatus } from 'src/auth/interfaces/sale-status.enum';
import { Address } from 'src/user/address.schema';
import { ShopItem } from './shop-Item.schema';

export type SaleDocument = Document & Sale;

@Schema({ timestamps: true })
export class Sale {
  @IsNotEmpty()
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  address: Address;

  @Prop({ required: true })
  shopList: ShopItem[];

  @Prop({ required: true })
  totalItemCost: number;

  @Prop({ required: true })
  saleStatus: SaleStatus;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
