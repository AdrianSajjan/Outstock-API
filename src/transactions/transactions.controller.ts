import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { from } from 'rxjs';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
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

  @Get(':id')
  fetchTransactionByID(@Param('id') id: string) {
    return from(this.transactionsService.findByID(id));
  }
}
