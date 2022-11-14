import { UpdateTransactionData } from '../../transactions/data-access';
import { OrderStatus } from '../schema';

export class UpdateTransactionAndOrderData extends UpdateTransactionData {
  status: OrderStatus;
}

export class UpdateOrderData {
  status: OrderStatus;
}
