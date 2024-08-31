import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionsService.create(createTransactionDTO);
  }

  @Get(':clientId/balance')
  balance(@Param('clientId') clientId: string) {
    return this.transactionsService.balance(clientId);
  }
}
