import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import PayableRepository from './repositories/payable.repository';
import { PrismaPayableRepository } from './repositories/prisma-payable.repository';
import { PayableController } from './payable.controller';

@Module({
  providers: [
    PayableService,
    {
      provide: PayableRepository,
      useClass: PrismaPayableRepository,
    },
  ],
  controllers: [PayableController],
  exports: [PayableService],
})
export class PayableModule {}
