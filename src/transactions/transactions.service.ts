import { Model } from 'mongoose';
import * as Razorpay from 'razorpay';
import { from, Observable, switchMap } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schema';
import { CreateTransactionData, UpdateTransactionData } from './data-access';
import { ConfigService } from '@nestjs/config';
import { Config } from '../config';

@Injectable()
export class TransactionsService {
  razorpayInstance: any;

  constructor(
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
    private readonly configService: ConfigService<Config>,
  ) {
    this.razorpayInstance = new Razorpay({
      key_id: configService.get('razorpay.keyID', { infer: true }),
      key_secret: configService.get('razorpay.secret', { infer: true }),
    });
  }

  create(user: string, createTransactionData: CreateTransactionData) {
    const { razorpayOrderID, razorpayPaymentID, razorpaySignature, ...data } = createTransactionData;

    return from(this.razorpayInstance.payments.fetch(razorpayPaymentID)).pipe(
      switchMap((result) => {
        const payment = result as any;
        return from(
          this.transactionModel.create({
            user,
            refundStatus: payment.refund_status ? payment.refund_status : '',
            refundAmount: payment.amount_refunded ? payment.amount_refunded / 100 : '',
            card: {
              lastFourDigits: payment.card.last4,
              network: payment.card.network,
              type: payment.card.type,
              issuer: payment.card.issuer,
              subType: payment.card.sub_type,
            },
            error: {
              code: payment.error_code,
              description: payment.error_description,
              source: payment.error_source,
              step: payment.error_step,
              reason: payment.error_reason,
            },
            paymentStatus: payment.status,
            method: payment.method,
            paymentID: razorpayPaymentID,
            ...data,
          }),
        );
      }),
    );
  }

  update(id: string, updateTransactionData: UpdateTransactionData): Observable<TransactionDocument> {
    return from(this.transactionModel.findByIdAndUpdate(id, { $set: updateTransactionData }));
  }

  updateByOrderID(order: string, updateTransactionData: UpdateTransactionData): Observable<TransactionDocument> {
    return from(this.transactionModel.findOneAndUpdate({ order }, { $set: updateTransactionData }));
  }
}
