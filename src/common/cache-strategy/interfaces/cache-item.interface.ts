import { Seconds } from './cache-strategy.interface';

export interface CacheItem {
  /**
   * The key of the item.
   */
  key: string;
  /**
   * The value being cached.
   */
  value: string;
  /**
   * The timestamp representing when this item expires. Current Timestamp + TTL.
   */
  expiry_timestamp: Seconds;
}
