import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthWithSameIdChecker } from '../auth/decorators/auth-with-same-id-checker.decorator';
import { Role } from '../auth/interfaces/roles.enum';
import { GetSalesDto } from './dto/get-sales.dto';
import { Sale } from './sale.schema';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  async addASale(@Body() sale: Sale) {
    console.log('asd');

    return await this.saleService.addASale(sale);
  }

  @Get('/:id')
  @AuthWithSameIdChecker(Role.ADMIN, Role.USER)
  async getUserSales(@Param('id') id: string): Promise<GetSalesDto> {
    return await this.saleService.getUserSales(id);
  }

  @Auth(Role.ADMIN)
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async editStatus(@Param('id') id: string): Promise<void> {
    return await this.saleService.editStatus(id);
  }
}
