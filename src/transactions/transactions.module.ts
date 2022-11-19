import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionDocument, TransactionSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Transaction.name,
        collection: 'Transactions',
        useFactory: () => {
          const schema = TransactionSchema;
          schema.pre<TransactionDocument>(/^find/, function (next) {
            const _this = this as any;
            if (_this.options._recursed) return next();
            this.populate({ path: 'order', strictPopulate: false, options: { _recursed: true } });
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
