/**
 * A simplified doubly linked list. Only implemented the functionality I needed.
 */
export class DoublyLinkedList<T> {
  private size = 0;
  head: DoublyLinkedListNode<T> | null = null;
  tail: DoublyLinkedListNode<T> | null = null;

  /**
   * Adds the node as the new head. Establishes the bi-directional connection
   * between the previous and current head.
   *
   * @param {DoublyLinkedListNode<T>} node
   */
  insertFront(node: DoublyLinkedListNode<T>) {
    if (this.head === node) {
      return;
    } else if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else if (this.hasOnlyOneItem()) {
      this.head = node;
      this.head.next = this.tail;
      this.tail.previous = this.head;
    } else {
      DoublyLinkedList.detachNode<T>(node);
      node.next = this.head;
      this.head.previous = node;
      this.head = node;
    }
    this.size++;
  }

  /**
   * Adds the node as the new tail. Establishes the bi-directional connection
   * between the previous and current tail.
   *
   * @param {DoublyLinkedListNode<T>} node
   */
  insertBack(node: DoublyLinkedListNode<T>) {
    if (this.tail === node) {
      return;
    } else if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      node.previous = this.tail;
      node.next = null;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  /**
   * Removes the last item in the linked list.
   *
   * @return {DoublyLinkedListNode<T> | undefined}
   */
  popBack(): DoublyLinkedListNode<T> | undefined {
    if (this.isEmpty()) {
      return;
    } else if (this.hasOnlyOneItem()) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.previous;
      this.tail.next = null;
    }
    this.size--;
  }

  /**
   * Get the current size of the list.
   */
  getSize() {
    return this.size;
  }

  /**
   * If the list is empty.
   *
   * @return {boolean}
   */
  isEmpty() {
    return this.head === null && this.tail === null;
  }

  /**
   * If the list only contains one item.
   *
   * @return {boolean}
   */
  hasOnlyOneItem() {
    return this.head === this.tail || (this.head && !this.tail);
  }

  /**
   * Detach a node from the linked list by:
   *   1. Re-pointing adjacent nodes to each other so they don't point to the
   *      node about to be removed.
   *   2. Removing any pointers from the to-be-removed node to adjacent nodes.
   *
   * @param {DoublyLinkedListNode<T>} node
   */
  static detachNode<T>(node: DoublyLinkedListNode<T>) {
    if (node.previous !== null) {
      node.previous.next = node.next;
    }
    if (node.next !== null) {
      node.next.previous = node.previous;
    }
    node.previous = null;
    node.next = null;
  }

  /**
   * Create a link list of n size with a builder function.
   *
   * @param {number} n
   * @param {() => T} itemBuilder
   * @return {DoublyLinkedList<T>}
   */
  static ofSize<T>(n: number, itemBuilder: () => T): DoublyLinkedList<T> {
    const list = new DoublyLinkedList<T>();

    Array
      .from({ length: n })
      .forEach(() =>
        list.insertBack(new DoublyLinkedListNode<T>(itemBuilder()))
      );

    return list;
  }
}

export class DoublyLinkedListNode<U> {
  value: U;
  previous: DoublyLinkedListNode<U> | null = null;
  next: DoublyLinkedListNode<U> | null = null;

  constructor(value: U) {
    this.value = value;
  }
}
