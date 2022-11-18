import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Razorpay from 'razorpay';
import { from, Observable, switchMap } from 'rxjs';
import { Config } from '../config';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { CreateOrderData, UpdateOrderData } from './data-access';
import { OrdersService } from './orders.service';
import { OrderDocument } from './schema';

@Controller('orders')
export class OrdersController {
  razorpayInstance: any;

  constructor(private readonly orderService: OrdersService, private readonly configService: ConfigService<Config>) {
    this.razorpayInstance = new Razorpay({
      key_id: configService.get('razorpay.keyID', { infer: true }),
      key_secret: configService.get('razorpay.secret', { infer: true }),
    });
  }

  @Post()
  createOrder(@CurrentUser() user: UserPayload, @Body() data: CreateOrderData): Observable<OrderDocument> {
    return from(this.razorpayInstance.orders.create({ amount: data.totalAmount * 100, currency: 'INR' })).pipe(
      switchMap((result) => {
        const rzpOrder = result as any;
        return from(this.orderService.create(user.id, { ...data, status: rzpOrder.status, oid: rzpOrder.id }));
      }),
    );
  }

  @Patch(':id')
  updateOrder(@Param('id') id: string, @Body() data: UpdateOrderData): Observable<OrderDocument> {
    const { status } = data;
    return from(this.orderService.update(id, { status }));
  }
}
