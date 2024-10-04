import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../modules/prisma/prisma.service';
import TransactionRepository, {
  AvailableBalanceResponse,
  CreatedTransaction,
  PendingBalanceResponse,
  RequestCreatePayable,
  RequestCreateTransaction,
  TransactionList,
} from './transaction.repository';
import { PayableStatus } from '../entities/payable.entity';
import { UuidGeneratorService } from '../../../libs/commons/services/uuid-generator.service';

@Injectable()
export default class PrismaTransactionRepository extends TransactionRepository {
  constructor(
    private prisma: PrismaService,
    private readonly uuidGeneratorService: UuidGeneratorService,
  ) {
    super();
  }

  async create(
    requestCreateTransaction: RequestCreateTransaction,
    requestCreatePayable: RequestCreatePayable,
  ): Promise<CreatedTransaction> {
    return this.prisma.$transaction(async (prisma) => {
      const createdTransaction = await prisma.transaction.create({
        data: {
          id: this.uuidGeneratorService.generate(),
          ...requestCreateTransaction,
        },
      });

      await prisma.payable.create({
        data: {
          ...requestCreatePayable,
          transactionId: createdTransaction.id,
        },
      });

      return createdTransaction;
    });
  }

  async getAvailableBalance(
    clientId: string,
  ): Promise<AvailableBalanceResponse> {
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
    return { available: availableBalance };
  }

  async getPendingBalance(clientId: string): Promise<PendingBalanceResponse> {
    const dbResult = await this.prisma.payable.aggregate({
      _sum: {
        value: true,
      },
      where: {
        clientId,
        status: PayableStatus.WAITING_FUNDS,
      },
    });
    const pendingBalance = dbResult._sum.value ?? 0;
    return { pending: pendingBalance };
  }

  async findAllByClient(clientId: string): Promise<TransactionList> {
    const list = await this.prisma.transaction.findMany({
      where: {
        clientId,
      },
    });
    return { transactions: list };
  }
}
