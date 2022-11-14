import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTransactionData } from './data-access';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}
}
