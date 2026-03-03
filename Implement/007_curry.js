/**
 * 柯里化（curry）工具函数
 * 将接收多个参数的函数转换成一系列只接收单一参数（或部分参数）的函数链，
 * 直到所有参数收集完毕后再执行原函数。
 *
 * @param {Function} fn - 需要被柯里化的原始函数
 * @returns {Function} 返回一个新的柯里化函数
 *
 * 示例：
 *   const add = (a, b, c) => a + b + c;
 *   const curriedAdd = curry(add);
 *   console.log(curriedAdd(1)(2)(3)); // 6
 *   console.log(curriedAdd(1, 2)(3));   // 6
 *   console.log(curriedAdd(1)(2, 3));   // 6
 */
function curry(fn) {
  // 返回一个新的函数，用于逐步接收参数
  return function (...args) {
    // 如果当前已接收的参数个数 >= 原函数形参个数（fn.length），则执行原函数
    if (args.length >= fn.length) {
      // 使用 apply 将已收集的参数一次性传入原函数并执行
      return fn.apply(this, args);
    } else {
      // 参数不足，继续返回一个新的柯里化函数
      // 使用 fn.bind(this, ...args) 将已接收的参数永久绑定到原函数上
      // 并递归调用 curry，继续收集剩余参数
      return curry(fn.bind(this, ...args));
    }
  };
}
