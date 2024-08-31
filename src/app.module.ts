import { Module } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [TransactionsModule, PrismaModule, ClientsModule],
  providers: [PrismaService],
})
export class AppModule {}
