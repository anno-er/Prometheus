/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  let result = [];
  let length = nums1.length + nums2.length;
  for (let i = 0; i < length; i++) {
    if (!nums1.length) {
      result = result.concat(nums2);
      break;
    }
    if (!nums2.length) {
      result = result.concat(nums1);
      break;
    }
    if (nums1[0] < nums2[0]) {
      result = result.concat(nums1.splice(0, 1));
    } else {
      result = result.concat(nums2.splice(0, 1));
    }
  }
  if (length % 2 === 0) {
    return (result[length / 2] + result[length / 2 - 1]) / 2;
  } else {
    return result[(length - 1) / 2];
  }
};
// @lc code=end

const midNumber = findMedianSortedArrays([1, 3], [2]);
console.log("@@-->midNumber", midNumber);

// 优化版本
var findMedianSortedArrays = function (nums1, nums2) {
  let m = nums1.length;
  let n = nums2.length;
  let total = m + n;
  let i = 0,
    j = 0;
  let current, last;

  // 只需要找到中位数位置的元素
  for (let k = 0; k <= Math.floor(total / 2); k++) {
    last = current;
    if (i < m && (j >= n || nums1[i] < nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  // 判断总数是奇数还是偶数
  if (total % 2 === 0) {
    return (last + current) / 2;
  } else {
    return current;
  }
};

// 优化版本思路 -- 找到两个中位数，然后计算中位数
var findMedianSortedArrays = function (nums1, nums2) {
  let m = nums1.length;
  let n = nums2.length;
  let i = 0,
    j = 0;
  let last, current;

  let total = m + n;
  for (let k = 0; k <= total / 2; k++) {
    last = current;
    if (i < m && (j >= n || nums1[i] < nums2[j])) {
      current = nums1[i++];
    } else {
      current = nums2[j++];
    }
  }

  if (total % 2 === 0) {
    return (last + current) / 2;
  } else {
    return current;
  }
};
