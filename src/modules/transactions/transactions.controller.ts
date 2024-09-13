import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './services/transactions.service';
import { TransactionResponse } from './dto/transaction-response.dto';
import { BalanceResponse } from './dto/balance-response.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionResponse> {
    const res = await this.transactionsService.create(createTransactionDTO);
    return new TransactionResponse(res);
  }

  @Get(':clientId/balance')
  async balance(@Param('clientId') clientId: string): Promise<BalanceResponse> {
    const res = await this.transactionsService.balance(clientId);
    return new BalanceResponse(res);
  }

  @Get(':clientId')
  async listClientTransactions(
    @Param('clientId') clientId: string,
  ): Promise<TransactionResponse[]> {
    return await this.transactionsService.listClientTransactions(clientId);
  }
}
