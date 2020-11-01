export default () => ({
  /**
   * @see {ICacheConfig}
   */
  cacheConfig: {
    maxKeySize: process.env.MAX_KEY_SIZE,
    maxValueSize: process.env.MAX_VALUE_SIZE,
    maxValueBlockCount: process.env.MAX_VALUE_BLOCK_COUNT,
    keyOverflowBehavior: process.env.KEY_OVERFLOW_BEHAVIOR,
    valueOverflowBehavior: process.env.VALUE_OVERFLOW_BEHAVIOR,
  },
});