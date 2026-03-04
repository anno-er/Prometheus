/* 两数之和：给定一个整数数组和一个目标值，找出数组中和为目标值的两个数 */
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(target - arr[i])) {
      return [target - arr[i], arr[i]];
    }
    map.set(arr[i], i);
  }
}

/* 三数之和：找出数组中所有和为 0 的不重复三元组 */
function threeSum(nums) {
  let result = [];
  nums.sort((a, b) => a - b > 0);
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (nums[i] == nums[i - 1]) continue;
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if (sum == 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
      } else if (sum < 0) {
        right--;
      } else {
        left++;
      }

      while (left < right && nums[left] == nums[left + 1]) left++;
      while (left < right && nums[right] == nums[right + 1]) right--;
    }
  }

  return result;
}

/* 移动零：将数组中的所有 0 移到数组末尾，同时保持非零元素的相对顺序 */
function moveZero(nums) {
  let slow = 0;
  let fast = 0;
  while (fast < nums.length) {
    if (nums[slow] === 0) {
      while (nums[fast] === 0 && fast < nums.length) fast++;
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
    }
    slow++;
    fast++;
  }
}

/* 移除元素：原地移除数组中所有等于给定值的元素 */
function moveItem(nums, target) {
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    while (nums[fast] === target && fast < nums.length) fast++;
    if (nums[slow] === target) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
    }
    slow++;
    fast++;
  }
  return nums.slice(0, slow);
}

/* 合并两个有序数组：将两个有序数组合并为一个有序数组 */
function mergeSortedArr(nums1, nums2) {
  let i = 0,
    j = 0;
  let result = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      result.push[nums1[i++]];
    } else {
      result.push[nums2[j++]];
    }
  }
  result.concat(nums1.slice(i).concat(nums2.slice(j)));
}

/* 反转字符串：原地反转字符数组 */
function reverseStr(str) {
  let strArr = str.split("");
  let left = 0,
    right = strArr.length - 1;
  while (left < right) {
    [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
    left++;
    right--;
  }
  return strArr.join("");
}

/* 最长公共前缀：查找字符串数组中的最长公共前缀 */
function maxSamePrefix(strArr) {
  if (!strs || strs.length == 0) return "";
  let result = "";
  for (let i = 0; i < strArr[0].length; i++) {
    const char = strs[0][i];
    for (let j = 0; j < strArr.length; j++) {
      if (i > strs[j].length || strs[j][i] !== char) return result;
    }
    result += strArr[0][i];
  }
  return result;
}

/* 有效的括号：判断括号字符串是否有效 -- '('，')'，'{'，'}'，'['，']' */
function validFigure(str) {
  let stack = [];
  let figureMap = new Map([[")", "("][("}", "{")][("]", "[")]]);
  for (let i = 0; i < str.length; i++) {
    if (figureMap.has(str[i])) {
      if (stack.pop() !== figureMap.get(str[i])) return false;
    } else {
      stack.push(str[i]);
    }
  }
  return stack.length <= 0;
}

/* 字符串转换整数：实现 atoi */
function myAtoi(s) {
  let i = 0;
  let sign = 1;
  let result = 0;

  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN = -(2 ** 31);

  // 1. 跳过空格
  while (i < str.length && s[i] === " ") i++;

  //2. 设置符号
  if (s[i] === "+" || s[i] === "-") {
    sign = s[i] === "+" ? 1 : -1;
    i++;
  }

  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i] - "0";
    if (
      result > INT_MAX / 10 ||
      (result === INT_MAX / 10 && digit > INT_MAX % 10)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }
    result = result * 10 + digit;
    i++;
  }

  return result * sign;
}

/* 两个数组中位数 - 合并数据排序，判断长度奇偶，取出中位数 */
function middleNum(nums1, nums2) {
  const lenght1 = nums1.length;
  const length2 = nums2.length;
  let p1 = 0;
  let p2 = 0;
  let total = lenght1 + length2;
  let cur, pre;
  for (let k = 0; k < Math.floor(total / 2); k++) {
    pre = cur;
    if (p1 < lenght1 && (p2 >= length2 || nums1[p1] < nums2[p2])) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }
  }
  if (total % 2 === 0) {
    return (cur + pre) / 2;
  } else {
    return cur;
  }
}

/* 最长回文子串 */
function longestPalindrome(str) {
  if (str.length <= 0) return str;

  let calcPalindromeLength = (s, left, right) => {
    while (s[left] === s[right] && left >= 0 && right < s.length) {
      left--;
      right++;
    }
    return right - left - 1;
  };

  let maxLen = 0;
  let right = 0;
  let left = 0;

  for (let i = 0; i < str.length; i++) {
    let jiLen = calcPalindromeLength(str, i, i);
    let ouLen = calcPalindromeLength(str, i, i + 1);
    let len = Math.max(jiLen, ouLen);
    if (len > maxLen) {
      maxLen = len;
      left = i - Math.floor((len - 1) / 2);
      right = i + Math.floor(len / 2);
    }
  }

  return str.substring(left, right + 1);
}

/* 盛水最多 */
function maxWater(nums) {
  let max = 0;
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let currentWater = Math.min(nums[left], nums[right]) * (right - left);
    max = Math.max(max, currentWater);
    if (nums[left] < nums[right]) {
      left++;
    } else {
      right--;
    }
  }
}

/* 最接近的三数之和 */
function threeSumClosest(nums, target) {
  let diff = Infinity;
  nums.sort((a, b) => {
    return a - b > 0;
  });
  let result;

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      let tempDiff = Math.abs(sum - target);
      if (tempDiff === 0) return sum;
      if (diff > tempDiff) {
        diff = tempDiff;
        result = sum;
      }

      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}

/* 删除有序数组中出现的重复项-快慢指针 */
function deleteDuplicatedItem(nums) {
  let slow = 0;
  let fast = 1;

  while (fast < nums.length) {
    while (nums[fast] === nums[slow] && fast < nums.length) {
      fast++;
    }
    nums[++slow] = nums[fast++];
  }
  return nums.slice(0, slow + 1);
}

/* 爬楼梯 */
function climbStairs(n) {
  if (n <= 2) return n;
  else {
    return climbStairs(n - 1) + climbStairs(n - 2);
  }
}

/* 二分查找：在有序数组中查找目标值 */
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < right) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return -1;
}

/* 排序： 冒泡排序 、选择排序 、插入排序 、快速排序 、归并排序 、堆排序 */
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let sortFlag = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        sortFlag = false;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    if (sortFlag) {
      return arr;
    }
  }
  return arr;
}

function selectSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = 0;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
      [arr[minIndex], arr[j]] = [arr[j], arr[minIndex]];
    }
  }
}

function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      } else {
        break;
      }
    }
  }
}

function qucikSort(arr) {
  if (arr.length <= 1) return arr;

  let left = [];
  let right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[0]) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return qucikSort(left).concat(arr[0], qucikSort(right));
}

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

/* 最大子数组和 */
function maxSubArray(nums) {
  let sum = 0;
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    max = Math.max(sum, max);
    if (sum < 0) {
      sum = 0;
    }
  }

  return max;
}

const obj = {
  a: 1,
  b: {
    c: 2,
  },
};
