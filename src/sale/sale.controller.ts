import { Body, Controller, Post } from '@nestjs/common';
import { AuthWithSameIdChecker } from '../auth/decorators/auth-with-same-id-checker.decorator';
import { Role } from '../auth/interfaces/roles.enum';
import { Sale } from './sale.schema';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  async addASale(@Body() sale: Sale) {
    console.log(sale);
    return await this.saleService.addASale(sale);
  }
}
