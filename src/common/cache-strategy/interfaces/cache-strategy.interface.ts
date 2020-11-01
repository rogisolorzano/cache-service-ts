import { ICacheConfig } from './cache-config.interface';

export interface ICacheStrategy {
  /**
   * Get the value for a key.
   *
   * @param {string} key
   */
  get(key: string): string;

  /**
   * Set the value for a key, with cache configuration.
   *
   * @param key
   * @param value
   * @param config
   */
  set(key: string, value: string, config: ICacheConfig): string;

  /**
   * Delete the value for a key.
   *
   * @param key
   */
  delete(key: string): string;
}
