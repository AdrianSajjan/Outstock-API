import { Model } from 'mongoose';
import { from, map, Observable } from 'rxjs';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  findByID(id: string) {
    return from(this.orderModel.findById(id)).pipe(
      map((order) => {
        if (order) return order;
        throw new NotFoundException('No such orders exist in the database');
      }),
    );
  }
}
