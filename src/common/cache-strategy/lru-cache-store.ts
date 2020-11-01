import { DoublyLinkedList, DoublyLinkedListNode } from '../doubly-linked-list';

export class LruCacheStore {
  private static instance: LruCacheStore;
  public keyNodeMap: Map<string, DoublyLinkedListNode>;
  public linkedList: DoublyLinkedList;

  private constructor() {
    // Intentionally left blank.
  }

  /**
   * Builds and returns the LruCacheStore singleton instance.
   *
   * @return {LruCacheStore}
   */
  public static sharedInstance(): LruCacheStore {
    if (!LruCacheStore.instance) {
      LruCacheStore.instance = new LruCacheStore();
    }

    return LruCacheStore.instance;
  }
}
