import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { TransactionsService } from './services/transactions.service';
import { TransactionResponse } from './dto/transaction-response.dto';
import { BalanceResponse } from './dto/balance-response.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a transaction',
  })
  @ApiBody({
    type: CreateTransactionDTO,
  })
  @ApiCreatedResponse({
    description: 'Transaction created with success',
    type: TransactionResponse,
  })
  async create(
    @Body() createTransactionDTO: CreateTransactionDTO,
  ): Promise<TransactionResponse> {
    const res = await this.transactionsService.create(createTransactionDTO);
    return new TransactionResponse(res);
  }

  @Get(':clientId/balance')
  @ApiOperation({
    summary: 'Get the balance of a client',
  })
  @ApiOkResponse({
    description: 'Client balance retrieved with success',
    type: BalanceResponse,
  })
  async balance(@Param('clientId') clientId: string): Promise<BalanceResponse> {
    const res = await this.transactionsService.balance(clientId);
    return new BalanceResponse(res);
  }

  @Get(':clientId')
  @ApiOperation({
    summary: 'List transactions of a client',
  })
  @ApiOkResponse({
    description: 'Client transactions retrieved with success',
    type: TransactionResponse,
    isArray: true,
  })
  async listClientTransactions(
    @Param('clientId') clientId: string,
  ): Promise<TransactionResponse[]> {
    return await this.transactionsService.listClientTransactions(clientId);
  }
}
