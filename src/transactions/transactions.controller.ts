import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.transactionsService.create(createTransactionDTO);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
}
