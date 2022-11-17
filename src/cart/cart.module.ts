import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartDocument, CartSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cart.name,
        collection: 'Cart',
        useFactory: () => {
          const schema = CartSchema;
          schema.pre<CartDocument>(/^find/, function (next) {
            this.populate('items.product');
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
