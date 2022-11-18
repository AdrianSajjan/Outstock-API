import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schema';

@Module({
  imports: [TransactionsModule, MongooseModule.forFeature([{ name: Order.name, collection: 'Orders', schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
