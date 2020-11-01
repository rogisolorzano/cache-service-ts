import { DoublyLinkedList, DoublyLinkedListNode } from './doubly-linked-list';
import { CacheItem } from './cache-strategy/interfaces/cache-item.interface';
import * as faker from 'faker';

/**
 * Uses faker to generate a random CacheItem.
 *
 * @return {CacheItem}
 */
const generateRandomCacheItem = (): CacheItem => ({
  key: faker.random.word(),
  expiry_timestamp: Math.round(faker.date.recent().getTime() / 1000),
  value: faker.random.words(),
});

/**
 * Recurses through linked list and collects the values.
 *
 * @param {DoublyLinkedListNode<T>} node
 * @param {Array<T>} collector
 * @return {Array<T>}
 */
const collectLinkedListValues = <T>(
  node: DoublyLinkedListNode<T>,
  collector: Array<T>
): Array<T> => {
  collector.push(node.value);

  if (node.next === null) {
    return collector;
  }

  return collectLinkedListValues(node.next, collector);
}

describe('DoublyLinkedList', () => {
  it('should track resizing accurately', () => {
    const randomSize = faker.random.number(15);
    const list = DoublyLinkedList.ofSize<CacheItem>(
      randomSize,
      generateRandomCacheItem,
    );
    const sizeBefore = list.getSize();

    list.popBack();
    list.popBack();
    list.insertFront(
      new DoublyLinkedListNode<CacheItem>(generateRandomCacheItem())
    );
    list.popBack();

    expect(sizeBefore).toBe(randomSize);
    expect(list.getSize()).toBe(randomSize - 2);
  });

  it('should keep size >= 0', () => {
    const list = DoublyLinkedList.ofSize<CacheItem>(
      1,
      generateRandomCacheItem,
    );

    list.popBack();
    list.popBack();
    list.popBack();

    expect(list.getSize()).toBe(0);
  });

  it('should maintain an accurate list', () => {
    const list = new DoublyLinkedList<string>();

    list.insertFront(new DoublyLinkedListNode<string>('2'));
    list.insertBack(new DoublyLinkedListNode<string>('3'));
    list.insertFront(new DoublyLinkedListNode<string>('1'));
    list.insertBack(new DoublyLinkedListNode<string>('4'));
    list.popBack();
    list.insertBack(new DoublyLinkedListNode<string>('5'));
    list.insertBack(new DoublyLinkedListNode<string>('6'));
    list.popBack();

    expect(collectLinkedListValues(list.head, []))
      .toEqual(['1', '2', '3', '5']);
  });
});
