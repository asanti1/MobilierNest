import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export type FurnitureDocument = Document & Furniture;

@Schema()
export class Furniture {
  @IsNotEmpty()
  @Prop({ required: true })
  name: string;

  @IsOptional()
  @Prop({ default: `No description` })
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  cost: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  stock: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  depthZ: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  heightX: number;

  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true })
  widthY: number;

  @IsNotEmpty()
  @Prop({ required: true })
  wood: string;
}

export const FurnitureSchema = SchemaFactory.createForClass(Furniture);
