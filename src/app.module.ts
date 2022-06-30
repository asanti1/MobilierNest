import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FurnitureModule } from './furniture/furniture.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FurnitureModule,
    MongooseModule.forRoot(`mongodb://localhost/nest`, {
      autoIndex: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
