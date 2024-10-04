import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../modules/prisma/prisma.service';
import { UuidGeneratorService } from '../../../libs/commons/services/uuid-generator.service';
import IdempotencyKeyRepository, {
  RequestCreateIdempotencyKey,
} from './idempotency.repository';
import { IdempotencyKey } from '../entities/IdempotencyKey.entity';

@Injectable()
export default class PrismaIdempotencyKeyRepository extends IdempotencyKeyRepository {
  constructor(
    private prisma: PrismaService,
    private readonly uuidGeneratorService: UuidGeneratorService,
  ) {
    super();
  }

  async create(
    requestCreateTransaction: RequestCreateIdempotencyKey,
  ): Promise<IdempotencyKey> {
    const id = this.uuidGeneratorService.generate();
    const dbResult = await this.prisma.idempotencyKey.create({
      data: {
        ...requestCreateTransaction,
        id,
      },
    });
    return dbResult;
  }

  async getIdempotencyKey(key: string): Promise<IdempotencyKey | null> {
    const dbResult = await this.prisma.idempotencyKey.findUnique({
      where: {
        key,
      },
    });
    return dbResult;
  }
}
