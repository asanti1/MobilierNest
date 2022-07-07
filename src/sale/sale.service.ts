import { Inject, Injectable } from '@nestjs/common';

import { SaleRepository } from './sale.repository';
import { Sale, SaleDocument } from './sale.schema';

@Injectable()
export class SaleService {
  constructor(@Inject(SaleRepository) private saleRepository: SaleRepository) {}

  addASale(sale: Sale): Promise<SaleDocument> {
    return this.saleRepository.addASale(sale);
  }
}
