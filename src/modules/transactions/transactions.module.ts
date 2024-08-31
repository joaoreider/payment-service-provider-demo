import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import TransactionRepository from './repositories/transaction.repository';
import PrismaTransactionRepository from './repositories/prisma-transaction-repository';
import { ClientsService } from '../clients/clients.service';
import { UuidGeneratorService } from 'src/libs/commons/services/uuid-generator.service';
import { TransactionsService } from './services/transactions.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ClientsService,
    UuidGeneratorService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
})
export class TransactionsModule {}
