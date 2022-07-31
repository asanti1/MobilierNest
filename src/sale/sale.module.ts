import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { FurnitureModule } from '../furniture/furniture.module';
import { SaleController } from './sale.controller';
import { SaleRepository } from './sale.repository';
import { Sale, SaleSchema } from './sale.schema';

import { SaleService } from './sale.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    FurnitureModule,
    AuthModule,
  ],
  controllers: [SaleController],
  providers: [SaleService, SaleRepository],
})
export class SaleModule {}
