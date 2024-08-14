import { Injectable } from '@nestjs/common';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import TransactionRepository from './repositories/transaction.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TransactionsService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(
    createTransactionDto: CreateTransactionDTO,
  ): Promise<Transaction> {
    // TODO: verify if client exists

    createTransactionDto.cardNumber = this.getLastFourDigits(
      createTransactionDto.cardNumber,
    );
    return await this.transactionRepository.create(
      uuidv4(),
      createTransactionDto,
    );
  }

  findAll(): Promise<Transaction[]> {
    return this.transactionRepository.findAll();
  }

  private getLastFourDigits(number: number): number {
    const numberString = number.toString();
    return Number(numberString.slice(-4));
  }
}
