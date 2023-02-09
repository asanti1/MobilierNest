import { Inject, Injectable } from '@nestjs/common';
import { GetSalesDto } from './dto/get-sales.dto';

import { SaleRepository } from './sale.repository';
import { Sale, SaleDocument } from './sale.schema';

@Injectable()
export class SaleService {
  constructor(@Inject(SaleRepository) private saleRepository: SaleRepository) {}

  addASale(sale: Sale): Promise<SaleDocument> {
    return this.saleRepository.addASale(sale);
  }

  getUserSales(userId: string): Promise<GetSalesDto> {
    return this.saleRepository.getUserSales(userId);
  }

  editStatus(id: string): Promise<void> {
    return this.saleRepository.editStatus(id);
  }
}
