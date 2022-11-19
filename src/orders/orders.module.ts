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

          schema.pre<OrderDocument>(/^find/, function (next) {
            this.populate({ path: 'cart', strictPopulate: false, populate: { path: 'items', strictPopulate: false } });
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
