import { Injectable } from '@nestjs/common';
import { SetValueDto } from './dto/set-value.dto';
import { ConfigService } from '@nestjs/config';
import { LruCacheStrategy } from '../common/cache-strategy/lru-cache-strategy';
import { ICacheConfig } from '../common/cache-strategy/interfaces';

@Injectable()
export class CacheService {
  cacheStrategy: LruCacheStrategy;

  constructor(private configService: ConfigService) {
    this.cacheStrategy = LruCacheStrategy.sharedInstance(
      configService.get<ICacheConfig>('cacheConfig')
    );
  }

  async get(key: string): Promise<string> {
    return this.cacheStrategy.get(key);
  }

  async set({key, value, ttl}: SetValueDto): Promise<void> {
    return this.cacheStrategy.set(key, value, ttl);
  }

  async delete(key: string): Promise<void> {
    this.cacheStrategy.delete(key);
  }
}
