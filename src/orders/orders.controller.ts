import { Controller, Get, Post, Body, Patch } from '@nestjs/common';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { TransactionsService } from '../transactions/transactions.service';
import { CreateOrderData, UpdateOrderData } from './data-access';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService, private readonly transactionService: TransactionsService) {}

  @Post('order')
  createOrder(@CurrentUser() user: UserPayload, @Body() createOrderData: CreateOrderData) {
    return this.orderService.create(createOrderData, user.id);
  }

  @Patch('order/:id')
  updateOrder(@Body() updateOrderData: UpdateOrderData) {
    return this.orderService.update(updateOrderData);
  }
}
