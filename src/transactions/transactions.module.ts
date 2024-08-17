import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PayableService } from '../payable/payable.service';
import TransactionRepository from './repositories/transaction.repository';
import PrismaTransactionRepository from './repositories/prisma-transaction-repository';
import PayableRepository from '../payable/repositories/payable.repository';
import { PrismaPayableRepository } from '../payable/repositories/prisma-payable.repository';
import { ClientsService } from '../clients/clients.service';
import ClientRepository from '../clients/repositories/client.repository';
import PrismaClientRepository from '../clients/repositories/prisma-client.repository';

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
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
})
export class TransactionsModule {}
