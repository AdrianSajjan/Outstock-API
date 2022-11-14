import { PaymentStatus, PaymentType, RefundStatus, TransactionError } from '../schema';

export class UpdateTransactionData {
  order?: string;
  paymentID?: string;
  amount?: string;
  paymentStatus?: PaymentStatus;
  refundStatus?: RefundStatus;
  refundAmount?: number;
  error?: TransactionError;
  type?: PaymentType;
}
