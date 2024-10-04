import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import ClientRepository from './repositories/client.repository';
import PrismaClientRepository from './repositories/prisma-client.repository';
import { UuidGeneratorService } from '../../libs/commons/services/uuid-generator.service';

@Module({
  controllers: [ClientsController],
  providers: [
    ClientsService,
    UuidGeneratorService,
    {
      provide: ClientRepository,
      useClass: PrismaClientRepository,
    },
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
