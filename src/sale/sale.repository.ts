import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { SaleStatus } from 'src/auth/interfaces/sale-status.enum';

import { Furniture, FurnitureDocument } from '../furniture/furniture.schema';
import { GetSalesDto } from './dto/get-sales.dto';
import { InsufficientStockException } from './exceptions/insufficient-stock.exception';
import { Sale, SaleDocument } from './sale.schema';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectModel(Furniture.name)
    private furnitureModel: Model<FurnitureDocument>,

    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,

    @InjectConnection() private connection: Connection,
  ) {}

  async getSales() {
    return this.saleModel.find();
  }

  async addASale(sale: Sale): Promise<SaleDocument> {
    console.log(sale.totalItemCost);

    const session = await this.connection.startSession();

    await session.withTransaction(async () => {
      await Promise.all(
        sale.shopList.map(async ({ furnitureId, quantity }) => {
          const item = await this.furnitureModel.findById(furnitureId, {
            name: 1,
            stock: 1,
          });
          if (!item)
            throw new NotFoundException(
              `The item with the id: ${furnitureId} was not found`,
            );

          if (item.stock < quantity)
            throw new InsufficientStockException(
              `Insufficient stock for ${item.name} please modify your cart`,
            );

          item.stock -= quantity;

          await item.save();
        }),
      );
    });
    await session.endSession();

    console.log('sigo vivo');
    return await this.saleModel.create({
      userId: sale.userId,
      address: sale.address,
      shopList: sale.shopList,
      totalItemCost: sale.totalItemCost,
      saleStatus: SaleStatus.PENDING,
    });
  }

  async getUserSales(userId: string): Promise<GetSalesDto> {
    const userSales = await this.saleModel.find({ userId: userId });
    const total = await this.saleModel.countDocuments({ userId: userId });

    const data: GetSalesDto = {
      userSales: userSales,
      total: total,
    };

    return data;
  }

  async editStatus(id: string): Promise<void> {
    const saleFound = await this.saleModel.findById(id);
    if (saleFound.saleStatus === SaleStatus.PENDING)
      saleFound.saleStatus = SaleStatus.COMPLETED;
    else saleFound.saleStatus = SaleStatus.PENDING;
    await saleFound.save();
    return;
  }
}
