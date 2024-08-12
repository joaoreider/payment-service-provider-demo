import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDTO } from '../dto/create-transaction.dto';
import TransactionRepository from './transaction.repository';

@Injectable()
export default class PrismaTransactionRepository extends TransactionRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    id: string,
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction> {
    const {
      value,
      description,
      paymentMethod,
      cardNumber,
      cardHolder,
      cardExpiry,
      cvv,
      clientId,
    } = createTransactionDTO;
    return await this.prisma.transaction.create({
      data: {
        id,
        value,
        description,
        paymentMethod,
        cardNumber,
        cardHolder,
        cardExpiry,
        cvv,
        clientId,
      },
    });
  }

  async findOne(id: string): Promise<Transaction> {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }
}
