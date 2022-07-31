import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Furniture, FurnitureDocument } from '../furniture/furniture.schema';
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

  async addASale({ userId, shopList }: Sale): Promise<SaleDocument> {
    const session = await this.connection.startSession();

    await session.withTransaction(async () => {
      await Promise.all(
        shopList.map(async ({ itemId, quantity }) => {
          const item = await this.furnitureModel.findById(itemId, {
            name: 1,
            stock: 1,
          });
          if (!item)
            throw new NotFoundException(
              `The item with the id: ${itemId} was not found`,
            );

          if (item.stock < quantity)
            throw new InsufficientStockException(
              `Insufficient stock for ${item.name}, id: ${itemId}`,
            );

          item.stock -= quantity;

          await item.save();
        }),
      );
    });

    await session.endSession();

    return await this.saleModel.create({
      userId: userId,
      shopList: shopList,
    });
  }
}
