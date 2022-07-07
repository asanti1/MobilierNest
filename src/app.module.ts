import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { SaleModule } from './sale/sale.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    FurnitureModule,
    UserModule,
    SaleModule,
    MongooseModule.forRoot(`mongodb://localhost/nest`, {
      autoIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
