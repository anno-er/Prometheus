/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 */

// @lc code:start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  // 修改循环条件为 <= 保证能检查到最后一个元素
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] > target) {
      // 修改右边界为 mid - 1 避免无限循环
      right = mid - 1;
    } else {
      // 修改左边界为 mid + 1 避免无限循环
      left = mid + 1;
    }
  }
  // 修改未找到时返回 -1 而不是 undefined
  return -1;
};
// @lc code:end