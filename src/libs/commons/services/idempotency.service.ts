import { Inject, Injectable } from '@nestjs/common';
import {
  iDistributedCacheService,
  IDistributedCacheService,
} from './distributed-cache.service';
import { TEN_MINUTES } from '../constants/app.constants';

@Injectable()
export class IdempotencyService {
  constructor(
    @Inject(iDistributedCacheService)
    private readonly distributedCache: IDistributedCacheService,
  ) {}

  async getKey(key: string): Promise<string> {
    return await this.distributedCache.get(key);
  }

  async saveKey(key: string): Promise<void> {
    this.distributedCache.set(key, key, TEN_MINUTES);
  }
}
