function myApply(context, argsArray) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.myApply - what is trying to be bound is not callable"
    );
  }

  context =
    context !== null && context !== undefined
      ? Object(context)
      : typeof window !== "undefined"
      ? window
      : global;

  let fnKey = Symbol("fnKey");
  context[fnKey] = this;
  let result = context[fnKey](...(argsArray || []));
  Reflect.deleteProperty(context, fnKey);
  return result;
}

function myCall(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.myApply - what is trying to be bound is not callable"
    );
  }

  context =
    context !== null && context !== undefined
      ? Object(context)
      : typeof window !== "undefined"
      ? window
      : global;

  let fnKey = Symbol("fnKey");
  context[fnKey] = this;
  let result = context[fnKey](...(argsArray || []));
  Reflect.deleteProperty(context, fnKey);
  return result;
}

function myBind(context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.myBind - what is trying to be bound is not callable"
    );
  }
  const originalFn = this;
  return function (...newArgs) {
    return originalFn.apply(context, args.concat(newArgs));
  };
}
