/*
 * @lc app=leetcode.cn id=121 lang=javascript
 *
 * [121] 买卖股票的最佳时机
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let max_profit = 0;
  for (let i = 0; i < prices.length - 1; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      max_profit = Math.max(max_profit, prices[j] - prices[i]);
    }
  }
  return max_profit;
};
// @lc code=end

/* 优化，一次遍历，记住历史低价 */
var maxProfitPro = function (prices) {
  let minPrice = Infinity;
  let max_profit = 0;
  for (let i = 0; i < prices.length; i++) {
    if (minPrice < prices[i]) {
      minPrice = prices[i];
    } else {
      max_profit = Math.max(max_profit, prices[i] - minPrice);
    }
  }

  return max_profit;
};
