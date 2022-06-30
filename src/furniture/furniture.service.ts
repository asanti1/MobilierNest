import { Inject, Injectable } from '@nestjs/common';

import { ModifyFurnitureDto } from './dto/modify-furniture.dto';
import { FurnitureRepository } from './furniture.repository';
import { Furniture, FurnitureDocument } from './furniture.schema';

@Injectable()
export class FurnitureService {
  constructor(
    @Inject(FurnitureRepository)
    private readonly furnitureRepository: FurnitureRepository,
  ) {}

  getFurnitures(): Promise<FurnitureDocument[]> {
    return this.furnitureRepository.getFurnitures();
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
}
