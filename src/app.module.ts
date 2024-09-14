import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';
import { ClientsModule } from './modules/clients/clients.module';
import { ConfigModule } from '@nestjs/config';
import { IdempotencyMiddleware } from './libs/commons/middlewares/idempotency.middleware';
import { RedisDistributedCacheService } from './libs/commons/services/redis-distributed-cache.service';
import { iDistributedCacheService } from './libs/commons/services/distributed-cache.service';
import { IdempotencyService } from './libs/commons/services/idempotency.service';

@Module({
  imports: [
    TransactionsModule,
    PrismaModule,
    ClientsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    PrismaService,
    IdempotencyService,
    {
      provide: iDistributedCacheService,
      useClass: RedisDistributedCacheService,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdempotencyMiddleware)
      .forRoutes({ path: 'transactions', method: RequestMethod.POST });
  }
}
