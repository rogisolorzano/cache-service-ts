export type Bytes = number;

export interface ICacheConfig {
  /**
   * The maximum key size in bytes.
   */
  maxKeySize: Bytes;
  /**
   * The maximum value size in bytes.
   */
  maxValueSize: Bytes;
  /**
   * The max number of values held in the cache.
   */
  maxValueBlockCount: number;
  /**
   * The behavior when we get a key that is larger than the max key size.
   */
  keyOverflowBehavior: OverflowBehavior;
  /**
   * The behavior when we get a block/value that is larger than the max key size.
   */
  valueOverflowBehavior: OverflowBehavior;
}

export enum OverflowBehavior {
  /**
   * Any data larger than the max block size will be truncated. The implementing
   * strategy should attempt to handle UTF-8 bytes gracefully.
   */
  truncate = "TRUNCATE",
  /**
   * Any data larger than the max block size will throw an exception.
   */
  throw = "THROW",
}
