import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './services/transactions.service';
import { BalanceResponse } from './dto/balance-response.dto';
import { TransactionResponse } from './dto/transaction-response.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionResponse> {
    return await this.transactionsService.create(createTransactionDTO);
  }

  @Get(':clientId/balance')
  async balance(@Param('clientId') clientId: string): Promise<BalanceResponse> {
    return await this.transactionsService.balance(clientId);
  }

  @Get(':clientId')
  async listClientTransactions(
    @Param('clientId') clientId: string,
  ): Promise<TransactionResponse[]> {
    return await this.transactionsService.listClientTransactions(clientId);
  }
}
