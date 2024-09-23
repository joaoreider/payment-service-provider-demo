import { Injectable } from '@nestjs/common';

import IdempotencyKeyRepository from '../repositories/idempotency.repository';

@Injectable()
export class IdempotencyService {
  constructor(
    private readonly idempotencyRepository: IdempotencyKeyRepository,
  ) {}

  async getKey(key: string): Promise<string> {
    const idempotencyKeyResponse =
      await this.idempotencyRepository.getIdempotencyKey(key);

    if (idempotencyKeyResponse) {
      return idempotencyKeyResponse.key;
    }
  }

  async saveKey(key: string): Promise<void> {
    this.idempotencyRepository.create({ key });
  }
}
