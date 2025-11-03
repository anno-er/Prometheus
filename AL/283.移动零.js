/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    if (nums[right] !== 0) {
      if (nums[left] === 0) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
      } else {
        left++;
      }
    } else {
      right--;
    }
  }
  console.log("@-->nums", nums);
};

moveZeroes([0]);
// @lc code=end

/* 上面解法破坏了非零元素的相对顺序，下面优化 */
var moveZeroes_1 = function (nums) {
  let slow = 0,
    fast = 1;
  while (fast < nums.length) {
    if (nums[slow] === 0) {
      while (fast < nums.length && nums[fast] === 0) fast++;
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
    }
    slow++;
    fast++;
  }
  console.log("@-->nums", nums);
};

moveZeroes_1([2, 1, 0, 3, 0, 9, 0, 15, 4]);
