export type Seconds = number;

export interface ICacheStrategy {
  /**
   * Get the value for a key.
   *
   * @param {string} key
   */
  get(key: string): string | null;

  /**
   * Set the value for a key, with cache configuration.
   *
   * @param {string} key
   * @param {string} value
   * @param {Seconds} ttl
   */
  set(key: string, value: string, ttl: Seconds);

  /**
   * Delete the value for a key.
   *
   * @param {string} key
   */
  delete(key: string);
}
