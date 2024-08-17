import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';
import { PayableController } from './payable.controller';
import ClientRepository from '../clients/repositories/client.repository';
import PrismaClientRepository from '../clients/repositories/prisma-client.repository';
import { ClientsService } from 'src/clients/clients.service';

@Module({
  providers: [
    PayableService,
    ClientsService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  controllers: [PayableController],
  exports: [PayableService],
})
export class PayableModule {}
