import { Inject, Injectable } from '@nestjs/common';
import { GetFurnitureDto } from './dto/get-furniture.dto';

import { ModifyFurnitureDto } from './dto/modify-furniture.dto';
import { FurnitureRepository } from './furniture.repository';
import { Furniture, FurnitureDocument } from './furniture.schema';

@Injectable()
export class FurnitureService {
  constructor(
    @Inject(FurnitureRepository)
    private readonly furnitureRepository: FurnitureRepository,
  ) {}

  getFurnitures(skip: number): Promise<GetFurnitureDto> {
    return this.furnitureRepository.getFurnitures(skip);
  }

  createFurnitures(furniture: Furniture): Promise<FurnitureDocument> {
    return this.furnitureRepository.createFurnitures(furniture);
  }

  getFurnitureById(id: string): Promise<FurnitureDocument> {
    return this.furnitureRepository.getFurnitureById(id);
  }

  deleteFurnitureById(id: string): Promise<void> {
    return this.furnitureRepository.deleteFurnitureById(id);
  }

  modifyFurnitureById(
    id: string,
    modifyFurnitureDto: ModifyFurnitureDto,
  ): Promise<FurnitureDocument> {
    return this.furnitureRepository.modifyFurnitureById(id, modifyFurnitureDto);
  }

  getFurnituresByName(search: string): Promise<GetFurnitureDto> {
    return this.furnitureRepository.getFurnituresByName(search);
  }
}
