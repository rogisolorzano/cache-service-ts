import { ICacheConfig, ICacheStrategy } from './interfaces';

export class LruCacheStrategy implements ICacheStrategy {
  get(key: string): string {
    return '';
  }

  set(key: string, value: string, config: ICacheConfig): string {
    return '';
  }

  delete(key: string): string {
    return '';
  }
}