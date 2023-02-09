import { Furniture } from '../furniture.schema';

export class GetFurnitureDto {
  furnitures: Furniture[];
  total: number;
}
