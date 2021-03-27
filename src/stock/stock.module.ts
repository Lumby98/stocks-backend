import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StonkEntity } from './infrastructure/stock.entity';
import { StonkGateway } from './API/gateway/stock.gateway';
import { IStonkServiceProvider } from './core/primaty-ports/stock.service.interface';
import { StonkService } from './core/services/stock/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([StonkEntity])],
  providers: [
    StonkGateway,
    { provide: IStonkServiceProvider, useClass: StonkService },
  ],
})
export class StockModule {}
