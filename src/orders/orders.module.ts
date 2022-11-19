import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderDocument, OrderSchema } from './schema';

@Module({
  imports: [
    TransactionsModule,
    MongooseModule.forFeatureAsync([
      {
        name: Order.name,
        collection: 'Orders',
        useFactory: () => {
          const schema = OrderSchema;

          schema.virtual('transactions', {
            ref: 'Transaction',
            localField: '_id',
            foreignField: 'order',
            justOne: false,
          });

          schema.pre<OrderDocument>(/^find/, function (next) {
            const _this = this as any;
            this.populate({ path: 'products.product' });
            if (_this.options._recursed) return next();
            this.populate({ path: 'transactions', options: { _recursed: true } });
            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
