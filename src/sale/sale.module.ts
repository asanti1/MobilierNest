import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FurnitureModule } from '../furniture/furniture.module';
import { SaleController } from './sale.controller';
import { SaleRepository } from './sale.repository';
import { Sale, SaleSchema } from './sale.schema';

import { SaleService } from './sale.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    FurnitureModule,
  ],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
})
export class SaleModule {}
