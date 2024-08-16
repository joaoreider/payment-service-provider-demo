import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { PrismaModule } from './prisma/prisma.module';
import { PayableModule } from './payable/payable.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TransactionsModule, PrismaModule, PayableModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
