import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';

@Module({
  providers: [
    PayableService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
})
export class PayableModule {}
