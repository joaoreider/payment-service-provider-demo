import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import TransactionRepository from './repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';
import { PayableService } from '../payable/payable.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly payableService: PayableService,
    private readonly clientService: ClientsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    const client = await this.clientService.findById(
      createTransactionDto.clientId,
    );

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    createTransactionDto.cardNumber = this.getCardLastFourDigits(
      createTransactionDto.cardNumber,
    );

    const transaction = await this.transactionRepository.create(
      uuidv4(),
      createTransactionDto,
    );

    await this.payableService.create({
      transactionId: transaction.id,
      ...transaction,
    });

    return transaction;
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  private getCardLastFourDigits(cardNumber: number): number {
    const numberString = cardNumber.toString();
    return Number(numberString.slice(-4));
  }
}
