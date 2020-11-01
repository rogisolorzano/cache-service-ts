import { Bytes, ICacheConfig, ICacheStrategy, OverflowBehavior, Seconds } from './interfaces';
import { DoublyLinkedList, DoublyLinkedListNode } from '../doubly-linked-list';
import { CacheItem } from './interfaces/cache-item.interface';
import { getCurrentTimestamp } from '../utils';
import { NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import * as truncate from 'truncate-utf8-bytes';

/**
 * A cache strategy that uses the Least Recently Used eviction policy. Uses a
 * hashmap and a doubly linked list under the hood to achieve O(1) gets, sets
 * and deletes. Uses O(n) space. Everytime a node is touched, it is moved to
 * the head of the linked list (O(1) time). The nodes near the tail of the list
 * are the least recently used nodes.
 *
 * Uses lazy expiration to enforce item expiry. This means that items aren't
 * expired until they are read.
 */
export class LruCacheStrategy implements ICacheStrategy {
  private static instance: LruCacheStrategy;
  private config: ICacheConfig;
  private keyNodeMap: Map<string, DoublyLinkedListNode<CacheItem>>;
  private linkedList: DoublyLinkedList<CacheItem>;

  private constructor(config: ICacheConfig) {
    this.config = config;
    this.keyNodeMap = new Map<string, DoublyLinkedListNode<CacheItem>>();
    this.linkedList = new DoublyLinkedList<CacheItem>();
  }

  /**
   * Builds and returns the LruCacheStrategy singleton instance.
   *
   * @return {LruCacheStrategy}
   */
  public static sharedInstance(initialConfig: ICacheConfig): LruCacheStrategy {
    if (!LruCacheStrategy.instance) {
      LruCacheStrategy.instance = new LruCacheStrategy(initialConfig);
    }

    return LruCacheStrategy.instance;
  }

  /**
   * @throws {NotFoundException}
   */
  get(key: string): string | null {
    const node = this.keyNodeMap.get(key);

    if (!node) {
      throw new NotFoundException();
    }

    if (this.isExpired(node.value.expiry_timestamp)) {
      this.delete(key);
      throw new NotFoundException();
    }

    this.setMostRecent(node);

    return node.value.value;
  }

  /**
   * @throws {Error}
   */
  set(key: string, value: string, ttl: Seconds) {
    key = this.enforceMaxSize(key, this.config.maxKeySize, this.config.keyOverflowBehavior);
    value = this.enforceMaxSize(value, this.config.maxValueSize, this.config.valueOverflowBehavior);

    const cacheItem: CacheItem = {
      expiry_timestamp: getCurrentTimestamp() + ttl,
      key,
      value,
    };

    if (this.keyNodeMap.has(key)) {
      const existingCacheItem = this.keyNodeMap.get(key).value;
      existingCacheItem.value = cacheItem.value;
      existingCacheItem.expiry_timestamp = cacheItem.expiry_timestamp;
    } else {
      if (this.keyNodeMap.size >= this.config.maxValueBlockCount) {
        this.linkedList.popBack();
        this.delete(this.linkedList.tail?.value.key);
      }

      this.keyNodeMap.set(key, new DoublyLinkedListNode<CacheItem>(cacheItem));
    }

    this.setMostRecent(this.keyNodeMap.get(key));
  }

  delete(key: string) {
    if (!this.keyNodeMap.has(key)) {
      throw new NotFoundException();
    }

    this.linkedList.popNode(this.keyNodeMap.get(key));
    this.keyNodeMap.delete(key);
  }

  /**
   * Set the node to the head of the linked list, which indicates that it is the most
   * recently used. When the cache is full, we evict items from the end of
   * the linked list, which are the least used keys.
   *
   * @param node
   */
  setMostRecent(node: DoublyLinkedListNode<CacheItem>) {
    this.linkedList.insertFront(node);
  }

  /**
   * Whether the timestamp is expired or not.
   *
   * @param {Seconds} timestamp
   */
  isExpired(timestamp: Seconds) {
    return getCurrentTimestamp() > timestamp;
  }

  /**
   * Ensure that the size of the block in bytes is not larger than the max.
   *
   * @param {string} block
   * @param {Bytes} maxSize
   * @param {OverflowBehavior} overflowBehavior
   * @throws {PayloadTooLargeException}
   */
  enforceMaxSize(
    block: string,
    maxSize: Bytes,
    overflowBehavior: OverflowBehavior,
  ): string {
    const bytes = Buffer.byteLength(block, 'utf8');

    if (bytes > maxSize) {
      switch (overflowBehavior) {
        case OverflowBehavior.truncate:
          block = truncate(block, maxSize);
          break;
        case OverflowBehavior.throw:
          throw new PayloadTooLargeException();
      }
    }

    return block;
  }
}
