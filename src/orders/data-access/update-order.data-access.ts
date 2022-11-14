import { OrderStatus } from '../schema';

export class UpdateOrderData {
  status: OrderStatus;
  transaction: string;
}
