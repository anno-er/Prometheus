/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号 -- '('，')'，'{'，'}'，'['，']'
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  const contarcts = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
  ]);
  for (let i = 0; i < s.length; i++) {
    if (contarcts.has(s[i])) {
      stack.push(s[i]);
    } else {
      const tail = stack.pop();
      if (s[i] !== contarcts.get(tail)) {
        return false;
      }
    }
  }
  // 检查是否所有括号都已匹配
  return stack.length === 0;
};
// @lc code=end

// console.log(isValid("()[]{}"));
// console.log(isValid("()"));
// console.log(isValid("(]"));
console.log(isValid(")()"));
// console.log(isValid("(("));
