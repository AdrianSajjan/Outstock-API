import { Controller, Get, Delete, Post, Param, Body } from '@nestjs/common';

import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { CartService } from './cart.service';
import { UpdateCartData } from './data-access';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('active')
  getActiveCart(@CurrentUser() user: UserPayload) {
    return this.cartService.getActiveCartByUserID(user.id);
  }

  @Post('update/:id')
  updateCart(@Param('id') id: string, @Body() updateCartData: UpdateCartData) {
    const { product, quantity, size } = updateCartData;
    return this.cartService.updateCart(id, product, quantity, size);
  }

  @Get('empty/:id')
  emptyCart(@Param('id') id: string) {
    return this.cartService.emptyCart(id);
  }

  @Delete('item/:id/:item')
  removeItemFromCart(@Param('id') id: string, @Param('item') item: string) {
    return this.cartService.removeItemFromCart(id, item);
  }
}
