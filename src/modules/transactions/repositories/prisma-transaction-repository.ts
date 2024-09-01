import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import TransactionRepository from './transaction.repository';
import { Payable, PayableStatus } from '../entities/payable.entity';

@Injectable()
export default class PrismaTransactionRepository extends TransactionRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(
    transaction: Transaction,
    payable: Payable,
  ): Promise<Transaction> {
    return this.prisma.$transaction(async (prisma) => {
      const createdTransaction = await prisma.transaction.create({
        data: {
          ...transaction,
        },
      });

      await prisma.payable.create({
        data: {
          ...payable,
        },
      });

      return createdTransaction;
    });
  }

  async getAvailableBalance(clientId: string): Promise<number> {
    const dbResult = await this.prisma.payable.aggregate({
      _sum: {
        value: true,
      },
      where: {
        clientId,
        status: PayableStatus.PAID,
      },
    });
    const availableBalance = dbResult._sum.value ?? 0;
    return availableBalance;
  }

  async getPendingBalance(clientId: string): Promise<number> {
    const dbResult = await this.prisma.payable.aggregate({
      _sum: {
        value: true,
      },
      where: {
        clientId,
        status: PayableStatus.WAITING_FUNDS,
      },
    });
    const availableBalance = dbResult._sum.value ?? 0;
    return availableBalance;
  }

  async findAllByClient(clientId: string): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      where: {
        clientId,
      },
    });
  }
}
