import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import TransactionRepository from './repositories/transaction.repository';
import PrismaTransactionRepository from './repositories/prisma-transaction-repository';
import { ClientsService } from '../clients/clients.service';
import { UuidGeneratorService } from '../../libs/commons/services/uuid-generator.service';
import { TransactionsService } from './services/transactions.service';
import ClientRepository from '../clients/repositories/client.repository';
import PrismaClientRepository from '../clients/repositories/prisma-client.repository';
import { PayableService } from './services/payable.service';
import { EncryptService } from '../../libs/commons/services/encryption.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ClientsService,
    UuidGeneratorService,
    EncryptService,
    PayableService,
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
