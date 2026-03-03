/*
 * @lc app=leetcode.cn id=1143 lang=javascript
 *
 * [1143] 最长公共子序列
 */

// @lc code=start
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
  // 获取两个字符串的长度
  const m = text1.length,
    n = text2.length;
  // 初始化动态规划数组 dp，大小为 (m+1) x (n+1)，初始值全为 0
  // dp[i][j] 表示 text1 的前 i 个字符与 text2 的前 j 个字符的最长公共子序列长度
  const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // 遍历 text1 的每个字符
  for (let i = 1; i <= m; i++) {
    // 遍历 text2 的每个字符
    for (let j = 1; j <= n; j++) {
      // 如果当前字符相等，则当前最长公共子序列长度等于左上角值加 1
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 否则，当前最长公共子序列长度等于上方或左方的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  // 返回整个字符串的最长公共子序列长度
  return dp[m][n];
};
// @lc code=end
