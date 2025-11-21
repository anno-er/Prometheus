/*
 * @lc app=leetcode.cn id=70 lang=javascript
 *
 * [70] 爬楼梯
 */

// @lc code=start

function climbStairs(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
}

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n <= 2) return n;

  // 使用动态规划优化解法
  let prev2 = 1; // 到达第1阶的方法数
  let prev1 = 2; // 到达第2阶的方法数

  for (let i = 3; i <= n; i++) {
    let current = prev1 + prev2; // 到达第i阶的方法数
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};
// @lc code=end
