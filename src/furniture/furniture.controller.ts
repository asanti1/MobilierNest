import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ParseObjectIdPipe } from '../pipes/string-to-objectid.pipe';
import { ModifyFurnitureDto } from './dto/modify-furniture.dto';
import { Furniture, FurnitureDocument } from './furniture.schema';
import { FurnitureService } from './furniture.service';

@Controller('furnitures')
export class FurnitureController {
  constructor(private furnitureService: FurnitureService) {}

  @Get()
  getFurnitures(): Promise<FurnitureDocument[]> {
    return this.furnitureService.getFurnitures();
  }

  @Post()
  createFurnitures(@Body() furniture: Furniture): Promise<FurnitureDocument> {
    return this.furnitureService.createFurnitures(furniture);
  }

  @Get('/:id')
  getFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<FurnitureDocument> {
    return this.furnitureService.getFurnitureById(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<void> {
    return this.furnitureService.deleteFurnitureById(id);
  }

  @Patch('/:id')
  modifyFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() modifyFurnitureDto: ModifyFurnitureDto,
  ): Promise<FurnitureDocument> {
    return this.furnitureService.modifyFurnitureById(id, modifyFurnitureDto);
  }
}
