/* 两数之和：给定一个整数数组和一个目标值，找出数组中和为目标值的两个数 */
function twoSum(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (map.has(target - arr[i])) {
      return [i, map.get(target - arr[i])];
    }
    map.set(arr[i], i);
  }
}

/* 三数之和：找出数组中所有和为 0 的不重复三元组 */
function threeSum(nums) {
  let reuslt = [];
  nums.sort((a, b) => a - b > 0);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total == 0) {
        reuslt.push([nums[i], nums[left], nums[right]]);
        // 跳过重复元素
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (total > 0) {
        right--;
      } else {
        left++;
      }
    }
  }
}

/* 移动零：将数组中的所有 0 移到数组末尾，同时保持非零元素的相对顺序 */
function moveZero(nums) {
  let slow = 0;
  let fast = 1;
  while (fast < nums.length) {
    if (nums[slow] === 0) {
      while (nums[fast] === 0 && fast < nums.length) right++;
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
    while (nums[fast] === target && fast < nums.length) {
      fast++;
    }
    if (nums[slow] === target) {
      nums[slow++] = nums[fast++];
    }
  }
  return slow;
}

/* 合并两个有序数组：将两个有序数组合并为一个有序数组 */
function mergeSortedArr(nums1, nums2) {
  let result = [];
  let i = 0,
    j = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      result.push(nums1[i]);
      i++;
    } else {
      result.push(nums2[j]);
      j++;
    }
  }
  // 拼接剩余的元素
  return result.concat(nums1.slice(i)).concat(nums2.slice(j));
}

/* 反转字符串：原地反转字符数组 */
function reverseStr(str) {
  let strArr = str.split("");
  let left = 0;
  let right = strArr.length - 1;
  while (left < right) {
    [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
    left++;
    right--;
  }
  return strArr.join();
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
  const figureMap = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  const figureStack = [];
  for (let i = 0; i < str.length; i++) {
    if (!figureMap.has(str[i])) {
      figureStack.push(str[i]);
    } else {
      if (figureStack.pop() !== figureMap.get(str[i])) return false;
    }
  }
  return figureStack.length === 0;
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
function longestPalindrome(str) {}
