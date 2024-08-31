import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import TransactionRepository from './repositories/transaction.repository';
import PrismaTransactionRepository from './repositories/prisma-transaction-repository';
import { ClientsService } from '../clients/clients.service';
import { UuidGeneratorService } from 'src/libs/commons/services/uuid-generator.service';
import { TransactionsService } from './services/transactions.service';
import ClientRepository from '../clients/repositories/client.repository';
import PrismaClientRepository from '../clients/repositories/prisma-client.repository';

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
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
})
export class TransactionsModule {}
