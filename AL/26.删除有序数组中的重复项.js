/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除有序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {

  if (nums.length <= 1) {
    return nums.length;
  }
  
  let slow = 1;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow - 1]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }
  return slow;
};

console.log(
  "@@->removeDuplicates",
  removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])
);
// @lc code=end
