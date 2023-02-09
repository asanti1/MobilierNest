import { Sale } from '../sale.schema';

export class GetSalesDto {
  userSales: Sale[];
  total: number;
}
