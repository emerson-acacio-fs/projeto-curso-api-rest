import { cacheConfig } from 'config/cache';
import Redis from 'ioredis';

const client = new Redis(cacheConfig.config.redis);
export class RedisCache {
  public async save(key: string, value: any): Promise<void> {
    await client.set(key, JSON.stringify(value));
  }
  public async record<T>(key: string): Promise<T | null> {
    const data = await client.get(key);
    if (!data) {
      return null;
    }
    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }
  public async invalidate(key: string): Promise<void> {
    await client.del(key);
  }
}
