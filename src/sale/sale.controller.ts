import { Body, Controller, Post } from '@nestjs/common';
import { Sale } from './sale.schema';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  async addASale(@Body() sale: Sale) {
    return await this.saleService.addASale(sale);
  }
}
