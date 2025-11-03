/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
/* 暴力解 - O((m+n)log(m+n))  -- O(log(m+n))*/
var merge = function (nums1, m, nums2, n) {
  nums1.splice(nums1.length - m, n, ...nums1);
  nums1.sort((a, b) => a - b);
};
// @lc code=end
/* 双指针，额外一个m+n三个月左右 */
var merge_1 = function (nums1, m, nums2, n) {
  let p1 = 0,
    p2 = 0;
  let sortArray = new Array(m + n).fill(0);
  let cur;
  while (p1 < m || p2 < n) {
    if (p1 >= m || nums1[p1] > nums2[p2]) {
      cur = nums2[p2++];
    } else if (p2 >= m || nums1[p1] <= nums2[p2]) {
      cur = nums1[p1++];
    }
    sortArray[p1 + p2 - 1] = cur;
  }

  for (let i = 0; i < nums1.length; i++) {
    nums1[i] = sortArray[i];
  }
  console.log("@@--->nums1", nums1);
};

/* 尾部双指针 */
var merge_2 = function (nums1, m, nums2, n) {
  let p1 = m - 1,
    p2 = n - 1;
  let tail = m + n - 1;
  while (p1 > -1 || p2 > -1) {
    if (p1 < 0) {
      nums1[tail--] = nums2[p2--];
    } else if (p2 < 0) {
      nums1[tail--] = nums1[p1--];
    } else if (nums1[p1] < nums2[p2]) {
      nums1[tail--] = nums2[p2--];
    } else {
      nums1[tail--] = nums1[p1--];
    }
  }
  console.log("@@--->nums1", nums1);
};

merge_2([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
