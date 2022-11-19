import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser } from '../shared/decorator';
import { UserPayload } from '../shared/interface';
import { CreateTransactionData, UpdateTransactionData } from './data-access';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  createTransaction(@CurrentUser() user: UserPayload, @Body() data: CreateTransactionData) {
    return this.transactionsService.create(user.id, data);
  }

  @Get('user')
  fetchTransactionsByUserID(@CurrentUser() user: UserPayload) {
    return this.transactionsService.findByUserID(user.id);
  }

  @Patch(':id')
  updateTransaction(@Param('id') id: string, @Body() data: UpdateTransactionData) {
    return this.transactionsService.update(id, data);
  }

  @Get(':id')
  fetchTransactionByID(@Param('id') id: string) {
    return this.transactionsService.findByID(id);
  }
}
