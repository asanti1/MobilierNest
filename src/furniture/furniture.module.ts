import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FurnitureController } from './furniture.controller';
import { FurnitureRepository } from './furniture.repository';
import { Furniture, FurnitureSchema } from './furniture.schema';
import { FurnitureService } from './furniture.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Furniture.name, schema: FurnitureSchema },
    ]),
  ],
  controllers: [FurnitureController],
  providers: [FurnitureService, FurnitureRepository],
  exports: [MongooseModule],
})
export class FurnitureModule {}
