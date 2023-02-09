import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFurnitureDto } from './dto/get-furniture.dto';

import { ModifyFurnitureDto } from './dto/modify-furniture.dto';
import { Furniture, FurnitureDocument } from './furniture.schema';

@Injectable()
export class FurnitureRepository {
  constructor(
    @InjectModel(Furniture.name)
    private furnitureModel: Model<FurnitureDocument>,
  ) {}

  async getFurnitures(skip: number): Promise<GetFurnitureDto> {
    const furnitures = await this.furnitureModel.find().skip(skip).limit(8);
    const total = await this.furnitureModel.countDocuments();
    return {
      furnitures,
      total,
    };
  }

  async getFurnituresByName(search: string): Promise<GetFurnitureDto> {
    const furniture = await this.furnitureModel.find({
      name: { $regex: search, $options: 'i' },
    });

    const total = furniture.length;

    return { furnitures: furniture, total: total };
  }

  async createFurnitures(furniture: Furniture): Promise<FurnitureDocument> {
    const createdFurniture = new this.furnitureModel(furniture);
    return await createdFurniture.save();
  }

  async getFurnitureById(id: string): Promise<FurnitureDocument> {
    const furniture = await this.furnitureModel.findById(id);
    if (!furniture)
      throw new NotFoundException(`the furniture with id: ${id} was not found`);

    return furniture;
  }

  async deleteFurnitureById(id: string): Promise<void> {
    const deletedFurniture = await this.furnitureModel.findByIdAndDelete(id);

    if (!deletedFurniture)
      throw new NotFoundException(
        `the furniture with id: ${JSON.stringify(id)} was not found`,
      );
    return;
  }

  async modifyFurnitureById(
    id: string,
    modifyFurnitureDto: ModifyFurnitureDto,
  ): Promise<FurnitureDocument> {
    const modifiedFurniture = await this.furnitureModel.findByIdAndUpdate(
      id,
      modifyFurnitureDto,
      { new: true },
    );

    if (!modifiedFurniture) {
      throw new NotFoundException(
        `the furniture with id: ${JSON.stringify(id)} was not found`,
      );
    } else {
    }
    return modifiedFurniture;
  }
}
