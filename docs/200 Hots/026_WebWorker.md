# WebWorker

Web Worker 为 Web 内容在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。一旦创建，Worker 就可以通过将消息发送到创建它的 JavaScript 代码指定的事件处理程序来与该代码通信。

## 一、 核心概念

在传统的浏览器环境中，JavaScript 是单线程运行的。这意味着如果执行一个复杂的计算任务，主线程会被阻塞，导致用户界面卡顿甚至崩溃。

**Web Worker** 允许我们在浏览器后台启动一个独立的线程，运行 JavaScript 脚本。这个线程与主线程并行工作，互不干扰，非常适合处理耗时较长的计算任务。

## 二、 Web Worker 与主线程的区别

| 特性         | 主线程 (Main Thread)               | Worker 线程 (Worker Thread)                    |
| :----------- | :--------------------------------- | :--------------------------------------------- |
| **DOM 访问** | 可以直接操作 DOM、Window、Document | **无法访问** DOM、Window、Document             |
| **通信方式** | 直接调用函数                       | 通过 `postMessage` 和 `onmessage` 进行消息传递 |
| **全局对象** | `window`                           | `self` 或 `DedicatedWorkerGlobalScope`         |
| **GUI 渲染** | 负责 UI 渲染、用户交互响应         | 不参与 UI 渲染                                 |
| **生命周期** | 随页面关闭而结束                   | 可由主线程控制开启/关闭，也可自销毁            |

## 三、 基本语法

### 1. 创建 Worker

在主线程中，通过 `Worker()` 构造函数创建一个新的 Worker 实例。

```javascript
const myWorker = new Worker("worker.js");
```

### 2. 消息通信

主线程与 Worker 线程之间通过 `postMessage()` 发送消息，通过 `onmessage` 事件监听消息。

- **主线程发送，Worker 接收：**

  ```javascript
  // 主线程
  myWorker.postMessage("Hello Worker");

  // worker.js
  self.onmessage = function (e) {
    console.log("Worker 收到消息:", e.data);
  };
  ```

- **Worker 发送，主线程接收：**

  ```javascript
  // worker.js
  self.postMessage("Hello Main");

  // 主线程
  myWorker.onmessage = function (e) {
    console.log("主线程收到消息:", e.data);
  };
  ```

### 3. 销毁 Worker

- **在主线程中销毁：**

  ```javascript
  myWorker.terminate();
  ```

- **在 Worker 线程内部自销毁：**
  ```javascript
  self.close();
  ```

### 4. 错误处理

```javascript
myWorker.onerror = function (error) {
  console.error("Worker 发生错误:", error.message);
};
```

## 四、 代码示例

实现一个在后台计算斐波那契数列的例子：

**main.js (主线程)**

```javascript
const worker = new Worker("fibonacci-worker.js");

worker.postMessage(40); // 计算第 40 项

worker.onmessage = function (e) {
  console.log("计算结果为:", e.data);
};

console.log("主线程继续执行其他任务...");
```

**fibonacci-worker.js (Worker 线程)**

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = function (e) {
  const num = e.data;
  const result = fibonacci(num);
  self.postMessage(result);
};
```

## 五、 主要限制

1.  **同源限制**：分配给 Worker 线程运行的脚本文件，必须与主线程的脚本文件同源。
2.  **DOM 限制**：Worker 线程无法访问 DOM 对象（如 `document`, `window`, `parent`），也无法使用 `alert()` 或 `confirm()`。
3.  **脚本限制**：Worker 无法执行 `eval()`，但可以访问 `navigator` 和 `location` 对象。
4.  **通信限制**：Worker 与主线程之间的通信是通过值传递（拷贝），而不是引用传递。对于大数据，可以使用 `Transferable Objects` 来提高性能。
5.  **文件限制**：无法访问本地文件系统（`file://` 协议），必须通过网络加载（`http(s)://`）。

## 六、 应用场景

1.  **复杂数学计算**：如加解密、图像处理、音视频解码。
2.  **大数据处理**：对大量 JSON 数据进行排序、过滤或格式化。
3.  **实时数据分析**：处理 WebSocket 传回的实时流数据。
4.  **拼写检查**：在后台进行文本分析而不影响输入体验。

## 七、 总结

Web Worker 是解决 JavaScript 单线程性能瓶颈的利器。它通过将非 UI 相关的重型任务转移到后台线程，保证了前端界面的流畅性。在现代复杂的 Web 应用中，合理使用 Web Worker 是提升用户体验的重要手段。
