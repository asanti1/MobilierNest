import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { FurnitureController } from './furniture.controller';
import { FurnitureRepository } from './furniture.repository';
import { Furniture, FurnitureSchema } from './furniture.schema';
import { FurnitureService } from './furniture.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Furniture.name, schema: FurnitureSchema },
    ]),
  ],
  controllers: [FurnitureController],
  providers: [FurnitureService, FurnitureRepository],
  exports: [MongooseModule],
})
export class FurnitureModule {}
