import { Card, PaymentStatus, PaymentType, RefundStatus, TransactionError } from '../schema';

export class CreateTransactionData {
  user: string;
  order: string;
  paymentID: string;
  amount: number;
  invoiceID: string;
  card?: Card;
  paymentStatus: PaymentStatus;
  emailAddress: string;
  refundStatus?: RefundStatus;
  refundAmount?: number;
  error?: TransactionError;
  phoneNumber: string;
  type: PaymentType;
}
