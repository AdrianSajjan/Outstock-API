import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderData, UpdateOrderData } from './data-access';
import { Order, OrderDocument } from './schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  create(id: string, createOrderData: CreateOrderData): Observable<OrderDocument> {
    return from(this.orderModel.create({ ...createOrderData, user: id }));
  }

  update(id: string, updateOrderData: UpdateOrderData) {
    return from(this.orderModel.findByIdAndUpdate(id, { $set: updateOrderData }));
  }
}
