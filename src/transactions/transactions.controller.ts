import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { from } from 'rxjs';
import { UserPayload } from '../shared/interface';
import { CurrentUser } from '../shared/decorator';
import { CreateTransactionData, UpdateTransactionData } from './data-access';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  createTransaction(@CurrentUser() user: UserPayload, @Body() data: CreateTransactionData) {
    return from(this.transactionsService.create(user.id, data));
  }

  @Patch(':id')
  updateTransaction(@Param('id') id: string, @Body() data: UpdateTransactionData) {
    return from(this.transactionsService.update(id, data));
  }
}
