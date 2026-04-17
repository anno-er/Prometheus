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

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    let current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
};

/**
 * 一次可以爬1到n层，问爬到第n层有多少种方法
 * @param {number} n - 楼梯总层数
 * @return {number}
 */
var climbStairsAny = function (n) {
  if (n === 0) return 1;
  if (n === 1) return 1;

  let dp = new Array(n + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      dp[i] += dp[j];
    }
  }

  return dp[n];
};
// @lc code=end
