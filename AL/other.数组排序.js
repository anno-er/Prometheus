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
        sortedFlage = false[(arr[j], arr[j + 1])] = [arr[j + 1], arr[j]];
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
    for (let j = i; j > 0; j++) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }

  return arr; // 建议添加返回语句，使函数行为更明确
};
