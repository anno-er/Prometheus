function myDebounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // fn.call(this, ...args);
      fn.apply(this, args);
    }, delay);
  };
}

function myThrottle(fn, delay) {
  let lastTime = new Date();
  return function (...args) {
    let currentTime = new Date();
    if (currentTime - lastTime >= delay) {
      lastTime = currentTime;
      fn.apply(this, args);
    }
  };
}
