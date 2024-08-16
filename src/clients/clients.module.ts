import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import ClientRepository from './repositories/client.repository';
import PrismaClientRepository from './repositories/prisma-client.repository';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
