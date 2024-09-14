import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { IDistributedCacheService } from './distributed-cache.service';

@Injectable()
export class RedisDistributedCacheService implements IDistributedCacheService {
  private readonly redis: Redis;

  constructor(configService: ConfigService) {
    this.redis = new Redis(
      parseInt(configService.get<string>('REDIS_PORT')),
      configService.get<string>('REDIS_HOST'),
    );
  }

  async set(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async get(key: string): Promise<string> {
    return await this.redis.get(key);
  }
}
