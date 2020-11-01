import { Seconds } from '../cache-strategy/interfaces';

/**
 * Get the current timestamp in seconds.
 *
 * @return {Seconds}
 */
export const getCurrentTimestamp = (): Seconds => Math.round(
    new Date().getTime() / 1000
  );
