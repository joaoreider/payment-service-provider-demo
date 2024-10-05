import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ClientsModule } from './modules/clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { IdempotencyMiddleware } from './libs/commons/middlewares/idempotency.middleware';
import { IdempotencyService } from './libs/commons/services/idempotency.service';
import IdempotencyKeyRepository from './libs/commons/repositories/idempotency.repository';
import PrismaIdempotencyKeyRepository from './libs/commons/repositories/prisma-idempotency-repository';
import { UuidGeneratorService } from './libs/commons/services/uuid-generator.service';
import { AppController } from './app.controller';

@Module({
  imports: [
    TransactionsModule,
    PrismaModule,
    ClientsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    PrismaService,
    UuidGeneratorService,
    IdempotencyService,
    {
      provide: IdempotencyKeyRepository,
      useClass: PrismaIdempotencyKeyRepository,
    },
  ],
  controllers: [AppController],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdempotencyMiddleware)
      .forRoutes({ path: 'transactions', method: RequestMethod.POST });
  }
}
