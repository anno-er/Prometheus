function MyNew(func, ...args) {
  let obj = {};
  obj.prototype = func.__proto__;
  const result = func(...args).call(obj);
  return typeof result === "object" ? result : obj;
}
