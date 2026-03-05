function throttle(fn, delay) {
  let t_timer;
  return function (...args) {
    if (t_timer) return;
    t_timer = setTimeout(() => {
      fn.call(this, ...args);
      t_timer = null;
    }, delay);
  };
}

function debounce(fn, delay) {
  let d_timer;
  return function (...args) {
    clearTimeout(d_timer);
    d_timer = setTimeout(() => {
      fn.aplly(this, args);
    }, delay);
  };
}
