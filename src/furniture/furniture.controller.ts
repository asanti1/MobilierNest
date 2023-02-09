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
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/interfaces/roles.enum';

import { ParseObjectIdPipe } from '../pipes/string-to-objectid.pipe';
import { GetFurnitureDto } from './dto/get-furniture.dto';
import { ModifyFurnitureDto } from './dto/modify-furniture.dto';
import { Furniture, FurnitureDocument } from './furniture.schema';
import { FurnitureService } from './furniture.service';

@Controller('furnitures')
export class FurnitureController {
  constructor(private furnitureService: FurnitureService) {}

  @Get('/:skip')
  getFurnitures(@Param('skip') skip: number): Promise<GetFurnitureDto> {
    return this.furnitureService.getFurnitures(skip);
  }

  @Post()
  @Auth(Role.ADMIN)
  createFurnitures(@Body() furniture: Furniture): Promise<FurnitureDocument> {
    return this.furnitureService.createFurnitures(furniture);
  }

  @Get('/:id')
  getFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<FurnitureDocument> {
    return this.furnitureService.getFurnitureById(id);
  }

  @Auth(Role.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
  ): Promise<void> {
    return this.furnitureService.deleteFurnitureById(id);
  }

  @Auth(Role.ADMIN)
  @Patch('/:id')
  modifyFurnitureById(
    @Param('id', new ParseObjectIdPipe()) id: string,
    @Body() modifyFurnitureDto: ModifyFurnitureDto,
  ): Promise<FurnitureDocument> {
    return this.furnitureService.modifyFurnitureById(id, modifyFurnitureDto);
  }

  @Get('/byName/:search')
  getFurnituresByName(
    @Param('search') search: string,
  ): Promise<GetFurnitureDto> {
    return this.furnitureService.getFurnituresByName(search);
  }
}
