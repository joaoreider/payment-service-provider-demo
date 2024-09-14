export interface IDistributedCacheService {
  set: (key: string, value: string, ttl: number) => Promise<void>;
  get: (key: string) => Promise<string>;
}

export const iDistributedCacheService = Symbol('IDistributedCacheService');
