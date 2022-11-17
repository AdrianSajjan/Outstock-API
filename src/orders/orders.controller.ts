import { from, map, Observable, switchMap } from 'rxjs';
import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateTransactionAndOrderData, UpdateTransactionAndOrderData } from './data-access';
import { OrderDocument } from './schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService, private readonly transactionService: TransactionsService) {}

  @Post('order')
  createOrder(@CurrentUser() user: UserPayload, @Body() data: CreateTransactionAndOrderData): Observable<OrderDocument> {
    const { cart, emailAddress, phoneNumber, totalAmount } = data;
    const transactionObservable = this.transactionService.create(user.id, { emailAddress, phoneNumber, amount: totalAmount });
    return from(transactionObservable).pipe(
      switchMap((transaction) => {
        return from(this.orderService.create({ totalAmount, cart, transaction: transaction._id }, user.id)).pipe(
          switchMap((order) => {
            return from(this.transactionService.update(transaction._id, { order: order._id })).pipe(map(() => order));
          }),
        );
      }),
    );
  }

  @Patch('order/:id')
  updateOrder(@Param('id') id: string, @Body() data: UpdateTransactionAndOrderData): Observable<OrderDocument> {
    const { status, ...updateTransactionData } = data;
    return from(this.orderService.update(id, { status })).pipe(
      switchMap((order) => {
        return from(this.transactionService.update(order.transaction._id, updateTransactionData)).pipe(map(() => order));
      }),
    );
  }
}
