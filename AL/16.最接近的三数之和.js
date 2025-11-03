/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  let diff = Infinity;
  let result = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1,
      right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      // 如果找到完全匹配，直接返回
      if (sum === target) {
        return sum;
      }

      if (Math.abs(sum - target) < diff) {
        result = sum;
        diff = Math.abs(sum - target);
      }
      if (sum > target) {
        right--;
      } else {
        left++;
      }
    }
  }
  return result;
};

console.log(threeSumClosest([-1, 2, 1, -4], 1));
console.log(threeSumClosest([0, 0, 0], 1));
// @lc code=end
