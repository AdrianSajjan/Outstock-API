import { Model } from 'mongoose';
import { from, switchMap, Observable, of } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartDocument } from './schema';
import { ProductDocument } from '../product/schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  getActiveCartByUserID(id: string): Observable<CartDocument> {
    return from(this.cartModel.findOne({ user: id, isActive: true })).pipe(
      switchMap((cart) => {
        if (cart) return of(cart);
        return from(this.cartModel.create({ user: id }));
      }),
    );
  }

  updateCart(id: string, product: ProductDocument, quantity: number, size?: string): Observable<CartDocument> {
    return from(this.cartModel.findById(id)).pipe(
      switchMap((cart) => {
        const index = cart.items.findIndex((item) => item.product === product._id);
        if (index === -1) {
          cart.items[index].quantity = quantity;
          return from(cart.save());
        } else {
          cart.items.push({ product: product, quantity, size });
        }
      }),
    );
  }

  emptyCart(id: string): Observable<CartDocument> {
    return from(this.cartModel.findByIdAndUpdate(id, { $set: { items: [] } }));
  }

  removeItemFromCart(id: string, item: string): Observable<CartDocument> {
    return from(this.cartModel.findByIdAndUpdate(id, { $pull: { items: { _id: item } } }));
  }
}
