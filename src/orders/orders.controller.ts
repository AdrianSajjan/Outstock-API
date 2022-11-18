import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Razorpay from 'razorpay';
import { from, map, Observable, switchMap } from 'rxjs';
import { Config } from '../config';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateTransactionAndOrderData, UpdateTransactionAndOrderData } from './data-access';
import { OrdersService } from './orders.service';
import { OrderDocument } from './schema';

@Controller('orders')
export class OrdersController {
  razorpayInstance: any;

  constructor(
    private readonly orderService: OrdersService,
    private readonly transactionService: TransactionsService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.razorpayInstance = new Razorpay({
      key_id: configService.get('razorpay.keyID', { infer: true }),
      key_secret: configService.get('razorpay.secret', { infer: true }),
    });
  }

  @Post('order')
  createOrder(@CurrentUser() user: UserPayload, @Body() data: CreateTransactionAndOrderData): Observable<OrderDocument> {
    const { emailAddress, phoneNumber, totalAmount, ...orderData } = data;
    return from(this.razorpayInstance.orders.create({ amount: data.totalAmount, currency: 'INR' })).pipe(
      switchMap((result) => {
        console.log(result);
        const rzpOrder = result as any;
        return from(
          this.orderService.create(user.id, {
            totalAmount,
            emailAddress,
            phoneNumber,
            status: rzpOrder.status,
            oid: rzpOrder.id,
            ...orderData,
          }),
        ).pipe(
          switchMap((order) => {
            return from(this.transactionService.create(user.id, { emailAddress, phoneNumber, amount: totalAmount, order: order._id })).pipe(
              map(() => order),
            );
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
        return from(this.transactionService.updateByOrderID(order._id, updateTransactionData)).pipe(map(() => order));
      }),
    );
  }
}
