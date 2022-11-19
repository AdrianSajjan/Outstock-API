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
    return from(this.cartModel.findOne({ user: id, status: 'active', isActive: true })).pipe(
      switchMap((cart) => {
        if (cart) return of(cart);
        return from(this.cartModel.create({ user: id }));
      }),
    );
  }

  addProductToCart(id: string, product: ProductDocument): Observable<CartDocument> {
    return from(this.cartModel.findById(id)).pipe(
      switchMap((cart) => {
        const index = cart.items.findIndex((item) => item.product._id == product._id);
        if (index !== -1) {
          cart.items[index].quantity = cart.items[index].quantity + 1;
        } else {
          cart.items.push({ product: product, quantity: 1 });
        }
        cart.totalPrice = cart.totalPrice + product.price;
        return from(cart.save());
      }),
    );
  }

  removeProductFromCart(id: string, product: ProductDocument): Observable<CartDocument> {
    return from(this.cartModel.findById(id)).pipe(
      switchMap((cart) => {
        const index = cart.items.findIndex((item) => item.product._id == product._id);
        if (index !== -1) cart.items[index].quantity = cart.items[index].quantity - 1;
        if (cart.items[index].quantity === 0) cart.items = cart.items.filter((item) => item.product._id != product._id);
        cart.totalPrice = cart.totalPrice - product.price;
        return from(cart.save());
      }),
    );
  }

  emptyCart(id: string): Observable<CartDocument> {
    return from(this.cartModel.findByIdAndUpdate(id, { $set: { items: [], totalPrice: 0 } }));
  }

  removeItemFromCart(id: string, _item: string): Observable<CartDocument> {
    return from(this.cartModel.findById(id)).pipe(
      switchMap((cart) => {
        const index = cart.items.findIndex((item) => item._id == _item);
        if (index !== -1) {
          const totalItemPrice = cart.items[index].product.price * cart.items[index].quantity;
          cart.totalPrice = cart.totalPrice - totalItemPrice;
          cart.items = cart.items.filter((item) => item._id != _item);
        }
        return from(cart.save());
      }),
    );
  }

  updateCartAsOrdered(id: string): Observable<CartDocument> {
    return from(this.cartModel.findByIdAndUpdate(id, { $set: { isActive: false, status: 'ordered' } }));
  }
}
