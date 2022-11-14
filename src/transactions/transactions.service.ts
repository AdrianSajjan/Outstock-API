import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schema';
import { CreateTransactionData, UpdateTransactionData } from './data-access';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) {}

  create(user: string, createTransactionData: CreateTransactionData): Observable<TransactionDocument> {
    return from(this.transactionModel.create({ user, ...createTransactionData }));
  }

  update(id: string, updateTransactionData: UpdateTransactionData): Observable<TransactionDocument> {
    return from(this.transactionModel.findByIdAndUpdate(id, { $set: updateTransactionData }));
  }

  updateByOrderID(order: string, updateTransactionData: UpdateTransactionData): Observable<TransactionDocument> {
    return from(this.transactionModel.findOneAndUpdate({ order }, { $set: updateTransactionData }));
  }
}
