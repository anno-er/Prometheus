/* 链表相关
   反转链表：反转单链表
   合并两个有序链表：将两个升序链表合并为一个新的升序链表
   删除链表的倒数第 N 个节点：删除链表中倒数第 n 个节点
   环形链表检测：判断链表中是否有环 */

/* javascript 链表相关知识 */
/* 1. 链表节点定义 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/* 反转单链表 */
function reverseList(head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  return cur;
}

/* 合并两个有序链表：将两个升序链表合并为一个新的升序链表 */
function merrgeSortedList(head1, head2) {
  let dummy = new ListNode(0);
  let tail = dummy;
  let p1 = head1;
  let p2 = head2;
  while (p1 !== null && p2 !== null) {
    if (p1.val <= p2.val) {
      tail.next = p1;
      p1 = p1.next;
    } else {
      tail.next = p2;
      p2 = p2.next;
    }
    tail = tail.next;
  }
  tail.next = p1 !== null ? p1 : p2;
  return dummy.next;
}

/*  删除链表的倒数第 N 个节点：删除链表中倒数第 n 个节点 */
function removeNthFromEnd(head, n) {
  let dummy = new ListNode(0, head);
  let first = head;
  let second = dummy;
  for (let i = 0; i < n; i++) {
    first = first.next;
  }
  while (first !== null) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return dummy.next;
}

/* 环形链表检测：判断链表中是否有环 */
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
