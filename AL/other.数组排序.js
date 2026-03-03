/* 前端面试中常见的排序算法 */
// 1. 冒泡排序
// 2. 选择排序
// 3. 插入排序
// 4. 快速排序
// 5. 归并排序

/* 1. 冒泡排序 - 时间复杂度O(n^2) 空间复杂度O(1) 原理：相邻元素两两比较，将最大的放在最后 */
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let sortedFlage = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        sortedFlage = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (sortedFlage) {
      return;
    }
  }
};

/* 2. 选择排序 - 时间复杂度O(n^2) 空间复杂度O(1) 原理：在未排序序列中找到最小（或最大）元素，将其放到已排序序列的末尾 */
const selectSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
};

/* 3. 插入排序 - 时间复杂度O(n^2) 空间复杂度O(1) 
原理：从第二个元素开始，将当前元素作为"待插入元素"，将待插入元素与已排序部分的元素从右到左依次比较 
如果待插入元素小于已排序元素，则将已排序元素右移一位， 直到找到合适的位置插入待插入元素
*/
const insertSort = (arr) => {
  if (arr.length <= 1) return arr;

  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }

  return arr; // 建议添加返回语句，使函数行为更明确
};

/* 4. 快速排序 - 时间复杂度O(nlogn) 空间复杂度O(logn) 原理：通过一趟排序将待排序记录分隔成独立的两部分，其中一部分记录的关键字均比另一部分记录的关键字小，
  则可分别对这两部分记录继续进行排序，以达到整个序列有序的目的 */
function qucikSort(arr) {
  if (arr.length <= 1) return arr;
  let pivot = arr[0];
  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return qucikSort(left).concat(pivot, qucikSort(right));
}

/* 5. 归并排序 - 时间复杂度O(nlogn) 空间复杂度O(n) 原理：将待排序序列递归地分成两半，分别对两半进行排序，然后将排序好的两半合并起来 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}
