import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PayableService } from '../payable/payable.service';
import TransactionRepository from './repositories/transaction.repository';
import PrismaTransactionRepository from './repositories/prisma-transaction-repository';
import PayableRepository from '../payable/repositories/payable.repository';
import { PrismaPayableRepository } from '../payable/repositories/prisma-payable.repository';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PayableService,
    ClientsService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
})
export class TransactionsModule {}
