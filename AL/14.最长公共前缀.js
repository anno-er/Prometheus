/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs || strs.length === 0) return "";

  let result = "";

  for (let i = 0; i < 200; i++) {
    // 检查是否超出第一个字符串长度
    if (i >= strs[0].length) break;

    const char = strs[0][i];

    // 直接比较而不是使用Set
    for (let j = 1; j < strs.length; j++) {
      if (i >= strs[j].length || strs[j][i] !== char) {
        return result;
      }
    }
    result += char;
  }
  return result;
};
