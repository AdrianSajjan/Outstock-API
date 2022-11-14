import { CreateTransactionData } from '../../transactions/data-access';

export class CreateTransactionAndOrderData extends CreateTransactionData {
  cart: string;
  totalAmount: number;
}

export class CreateOrderData {
  cart: string;
  transaction?: string;
  totalAmount: number;
}
