import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema, collection: 'Products' }])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
