# RequestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

## 一、 核心概念

在 Web 开发中，实现动画的传统方式是使用定时器（`setTimeout` 或 `setInterval`）。然而，这些定时器并不能保证回调函数在屏幕刷新时准确执行，往往会导致动画卡顿、跳帧或功耗增加。

`requestAnimationFrame` (简称 rAF) 的出现正是为了解决这些问题。它能让浏览器在最合适的时间（通常是每秒 60 次，即 16.7ms 间隔）执行动画更新。

## 二、 与 setTimeout / setInterval 的区别

| 特性         | setTimeout / setInterval                                       | requestAnimationFrame                                    |
| :----------- | :------------------------------------------------------------- | :------------------------------------------------------- |
| **执行时机** | 经过指定时间后将任务放入任务队列，不考虑浏览器刷新频率。       | 浏览器重绘之前执行，与刷新频率（通常 60Hz）同步。        |
| **精确度**   | 不精确。受事件循环机制影响，如果主线程繁忙，执行时间会被推迟。 | 高精确。由系统决定执行时机，保证在重绘前完成。           |
| **性能**     | 可能导致“丢帧”。如果执行频率高于刷新频率，会导致不必要的计算。 | 自动匹配刷新频率，避免无效渲染，节省 CPU 和 GPU。        |
| **后台运行** | 即使标签页隐藏，定时器依然在后台运行（虽然频率会降低）。       | 标签页不可见或最小化时，动画会自动暂停，节省电量和资源。 |

## 三、 基本语法

### 1. 开启动画

```javascript
const requestID = window.requestAnimationFrame(callback);
```

- **callback**: 下一次重绘之前更新动画帧所调用的函数。该回调函数会被传入一个参数 `DOMHighResTimeStamp`，表示当前执行的回调函数的开始时间。
- **返回值**: 一个长整型整数 `requestID`，是回调列表中的唯一的标识，可用于取消回调函数。

### 2. 取消动画

```javascript
window.cancelAnimationFrame(requestID);
```

## 四、 代码示例

实现一个简单的位移动画：

```javascript
const element = document.getElementById("box");
let distance = 0;

function step(timestamp) {
  distance += 2;
  element.style.transform = `translateX(${distance}px)`;

  if (distance < 500) {
    // 递归调用实现持续动画
    window.requestAnimationFrame(step);
  }
}

// 启动动画
window.requestAnimationFrame(step);
```

## 五、 主要优势

1.  **性能更佳**：浏览器可以将并发的动画操作合并到一个重绘周期中完成。
2.  **节省功耗**：在后台标签页中停止运行，特别适合移动设备。
3.  **动画平滑**：由于执行时机与屏幕刷新率一致，可以最大限度地避免掉帧和卡顿。

## 六、 注意事项

- **非递归调用**：`requestAnimationFrame` 只会执行一次。如果需要持续动画，必须在回调函数内部再次调用它。
- **主线程阻塞**：虽然 rAF 性能更好，但如果回调函数内部逻辑过于复杂，依然会阻塞主线程，导致掉帧。
- **兼容性**：现代浏览器均已支持。对于极老的浏览器，可以使用 `setTimeout` 进行 Polyfill 降级。

## 七、 为什么用 RequestAnimationFrame 实现定时器？

虽然浏览器提供了 `setTimeout` 和 `setInterval`，但在某些高精度或性能敏感的场景下，开发者更倾向于使用 `requestAnimationFrame` (rAF) 来模拟定时器，原因如下：

1.  **高精度同步**：`setTimeout` 的执行时机是不确定的，它只是在指定时间后将任务加入宏任务队列。如果主线程繁忙，执行时间会被严重推后。而 rAF 严格绑定浏览器的重绘频率，通常是 16.7ms，这对于需要与视觉渲染同步的逻辑（如动画中的碰撞检测、进度条）至关重要。
2.  **节省性能与电量**：当页面处于后台标签页或最小化时，`setTimeout` 依然会尝试执行（尽管浏览器会限制其频率），而 rAF 会完全暂停，避免了无意义的计算和能耗。
3.  **避免掉帧**：在处理高频任务（如 10ms 执行一次的逻辑）时，`setInterval` 可能会在一帧内触发多次，导致渲染压力过大。rAF 保证每一帧只执行一次，自动过滤了不必要的执行次数。

## 八、 实现案例

### 1. 模拟 setTimeout

通过记录初始时间，并在每一帧对比当前时间来实现。

```javascript
function mySetTimeout(callback, delay) {
  const start = Date.now();

  function loop() {
    const current = Date.now();
    if (current - start >= delay) {
      callback();
    } else {
      requestAnimationFrame(loop);
    }
  }

  const timer = requestAnimationFrame(loop);
  return timer;
}

// 使用
mySetTimeout(() => {
  console.log("3秒后执行了");
}, 3000);
```

### 2. 模拟 setInterval

在每次回调执行后，重置起始时间并继续递归。

```javascript
function mySetInterval(callback, interval) {
  let start = Date.now();
  let timer;

  function loop() {
    const current = Date.now();
    if (current - start >= interval) {
      callback();
      start = Date.now(); // 重置开始时间
    }
    timer = requestAnimationFrame(loop);
  }

  timer = requestAnimationFrame(loop);
  return {
    clear: () => cancelAnimationFrame(timer),
  };
}

// 使用
const myTimer = mySetInterval(() => {
  console.log("每隔1秒执行一次");
}, 1000);

// 停止定时器
// myTimer.clear();
```
