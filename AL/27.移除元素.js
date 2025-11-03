/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 */

// @lc code:start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let slow = 0,
    fast = 0;
  while (fast < nums.length) {
    if (nums[fast] === val) {
      fast++;
    } else {
      nums[slow++] = nums[fast++];
    }
  }
  // 修改：返回新数组的长度
  return slow;
};
// @lc code:end