# JavaScript 基础知识

## 1. 不会冒泡的事件有哪些？

以下事件不会冒泡（即不会从触发元素向上传播到祖先元素）：

- **blur** – 元素失去焦点
- **focus** – 元素获得焦点
- **focusin** – 元素即将获得焦点（部分浏览器实现，但规范中仍不冒泡）
- **focusout** – 元素即将失去焦点（同上）
- **mouseenter** – 鼠标进入元素
- **mouseleave** – 鼠标离开元素
- **load** – 资源加载完成（如 `<img>`、`<script>`、`<link>`）
- **unload** – 文档或资源卸载
- **beforeunload** – 窗口或文档即将卸载
- **DOMContentLoaded** – 文档解析完成
- **readystatechange** – 文档 readyState 变化（部分场景不冒泡）
- **resize** – 窗口大小变化
- **scroll** – 元素滚动（部分实现不冒泡）
- **error** – 资源加载失败（如 `<img>`、`<script>`）

> 注意：`mouseenter` 与 `mouseleave` 是 `mouseover`/`mouseout` 的不冒泡版本，专为避免子元素干扰而设计。

## 2. mouseEnter 和 mouseOver 有什么区别？

- mouseEnter 只在鼠标进入元素时触发，不会冒泡。
- mouseOver 在鼠标进入元素或其子元素时触发，会冒泡。

## 3. MessageChannel 是什么，有什么使用场景，给出使用案例？

MessageChannel 是一种浏览器 API，用于在不同的执行上下文（如主线程和 Web Worker）之间传递消息。

### 使用场景

- 在 Web Worker 中与主线程通信
- 在不同的浏览器标签页之间通信

### 使用案例

#### 主线程代码：

```javascript
const worker = new Worker("worker.js");
const channel = new MessageChannel();
channel.port1.onmessage = (event) => {
  console.log("主线程收到消息:", event.data);
};
worker.postMessage("hello worker", [channel.port2]);
```

#### Web-Worker 代码（worker.js）：

```javascript
self.onmessage = (event) => {
  console.log("Web-Worker 收到消息:", event.data);
  event.ports[0].postMessage("hello main thread");
};
```

#### 运行结果：

```
主线程收到消息: hello worker
Web-Worker 收到消息: hello main thread
```

### Web-Worker 与 主线程 之间的通信

Web-Worker 是一种在后台运行的 JavaScript 线程，它可以与主线程进行通信。

- 主线程可以通过 postMessage 方法向 Web-Worker 发送消息
- Web-Worker 可以通过 onmessage 事件监听主线程发送的消息
- 主线程和 Web-Worker 之间的通信是异步的
- 主线程发送消息后不会阻塞，Web-Worker 处理消息后可以通过 postMessage 方法向主线程发送消息

#### 使用案例

##### 主线程代码：

```javascript
const worker = new Worker("worker.js");
const channel = new MessageChannel();
channel.port1.onmessage = (event) => {
  console.log("主线程收到消息:", event.data);
};
worker.postMessage("hello worker", [channel.port2]);
```

##### Web-Worker 代码（worker.js）：

```javascript
self.onmessage = (event) => {
  console.log("Web-Worker 收到消息:", event.data);
  event.ports[0].postMessage("hello main thread");
};
```

##### 运行结果：

```
主线程收到消息: hello worker
Web-Worker 收到消息: hello main thread
```

### JavaScript 多线程的相关概念与代码使用案例

多线程是指在一个程序中同时运行多个线程，每个线程都可以独立执行不同的任务。

JavaScript 是一种单线程语言，这意味着它只能在一个线程中执行代码。但是，通过使用 Web-Worker 等技术，我们可以在 JavaScript 中实现多线程。

#### 使用案例

##### 主线程代码：

```javascript
const worker = new Worker("worker.js");
worker.postMessage("hello worker");
worker.onmessage = (event) => {
  console.log("主线程收到消息:", event.data);
};
```

##### Web-Worker 代码（worker.js）：

```javascript
self.onmessage = (event) => {
  console.log("Web-Worker 收到消息:", event.data);
  self.postMessage("hello main thread");
};
```

##### 运行结果：

```
主线程收到消息: hello worker
```

## 4. async、await 实现原理

async/await 是 ES2017 引入的异步编程语法糖，它的核心作用是让异步代码看起来和行为更像同步代码，同时保持非阻塞的特性。

从实现原理来看，async/await 本质上是 Generator 函数和 Promise 自动执行器的结合。具体来说：

- **async 函数转换为 Generator 函数**：当 JavaScript 引擎遇到一个 async 函数时，会将其转换为一个 Generator 函数，其中每个 await 表达式被转换为 yield 语句，后面跟着一个 Promise 对象。

- **状态机管理**：转换后的 Generator 函数实际上是一个状态机，通过维护不同的状态来跟踪函数的执行进度。

- **自动执行器**：引擎会自动生成一个执行器，负责在 Promise 解决后恢复 Generator 函数的执行。这个执行器类似于手动编写的 Generator 执行器，但更加智能和自动化。

- **事件循环调度**：整个执行过程由事件循环协调，确保异步操作在正确的时机执行。

#### 使用案例：

```javascript
async function asyncFunction() {
  const result = await someAsyncOperation();
  console.log(result);
}
```

#### 运行结果：

```
异步操作完成，结果为: some result
```

## 5. Proxy 能够监听到对象中的对象的引用吗？

答案：Proxy 能够监听到对象中的对象的引用，这是因为 Proxy 是一个代理对象，它可以拦截对目标对象的操作。当目标对象是一个对象时，Proxy 可以监听对该对象的引用，包括对对象属性的访问和修改。

#### 示例代码：

```javascript
const obj = {
  a: 1,
  b: {
    c: 2,
  },
};

const proxy = new Proxy(obj, {
  get(target, prop) {
    console.log(`访问属性 ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`设置属性 ${prop} 为 ${value}`);
    target[prop] = value;
  },
});

proxy.b.c; // 访问属性 b.c
proxy.b.c = 3; // 设置属性 b.c 为 3
```

## 6. 如何让 var[a,b]={a: 1, b: 2} 解构赋值成功？

问题分析：`[a,b]`是数组解构语法，期望右侧是可迭代对象，而`{a: 1, b: 2}`是对象，不是可迭代对象。

### 解决方案：

#### 方案 1：使用对象解构赋值（推荐）

```javascript
var { a, b } = { a: 1, b: 2 };
console.log(a); // 1
console.log(b); // 2
```

#### 方案 2：转换为数组后解构

```javascript
var [a, b] = Object.values({ a: 1, b: 2 });
console.log(a); // 1
console.log(b); // 2
```

#### 方案 3：使用 Object.entries

```javascript
var [[, a], [, b]] = Object.entries({ a: 1, b: 2 });
console.log(a); // 1
console.log(b); // 2
```

## 11. Common.js 和 ES6 中模块引入的区别？给出代码案例

### 主要区别：

- **语法差异**：CommonJS 使用 `require()` 导入，`module.exports` 导出；ES6 使用 `import` 导入，`export` 导出
- **加载机制**：CommonJS 运行时加载，同步加载；ES6 编译时加载，异步加载
- **值的引用**：CommonJS 输出值的拷贝；ES6 输出值的引用
- **运行环境**：CommonJS 主要用于 Node.js；ES6 浏览器和 Node.js 都支持

### CommonJS 代码案例：

#### math.js - 导出模块

```javascript
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// 单个导出
exports.add = add;
exports.multiply = multiply;

// 或者使用 module.exports
// module.exports = { add, multiply };
```

#### main.js - 导入模块

```javascript
// 导入整个模块
const math = require("./math");
console.log(math.add(2, 3)); // 5

// 解构导入
const { add, multiply } = require("./math");
console.log(add(2, 3)); // 5
```

### ES6 模块代码案例：

#### math.js - 导出模块

```javascript
// 命名导出
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// 默认导出
export default function (a, b) {
  return a + b;
}

// 导出变量
export const PI = 3.14159;
```

#### main.js - 导入模块

```javascript
// 导入默认导出
import myAddFunction from "./math.js";
console.log(myAddFunction(2, 3)); // 5

// 导入命名导出
import { add, multiply, PI } from "./math.js";
console.log(add(2, 3)); // 5
console.log(PI); // 3.14159

// 导入所有命名导出到一个对象
import * as math from "./math.js";
console.log(math.add(2, 3)); // 5

// 重命名导入
import { add as sum, multiply as product } from "./math.js";
console.log(sum(2, 3)); // 5
```

## 12. 说说 Vue3 中的响应式设计原理

响应式设计原理：Vue3 采用了基于 Proxy 的响应式系统，通过代理对象来监听数据的变化，当数据发生变化时，会自动触发相关的更新操作。

#### 示例代码：

```javascript
const data = {
  a: 1,
  b: 2,
};

const proxy = new Proxy(data, {
  get(target, prop) {
    console.log(`访问属性 ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`设置属性 ${prop} 为 ${value}`);
    target[prop] = value;
  },
});

proxy.a; // 访问属性 a
proxy.a = 3; // 设置属性 a 为 3
```

## 13. script 标签放在 header 里和放在 body 底部里有什么区别？

- **放在 header 里**：脚本会在页面加载完成前执行，可能会阻塞页面渲染。
- **放在 body 底部**：脚本会在页面加载完成后执行，不会阻塞页面渲染。
- **推荐**：放在 body 底部，确保 DOM 元素加载完成后再执行脚本。

## 15. Vue 中，created 和 mounted 两个钩子之间调用时间差值受什么影响？

影响：created 钩子在实例初始化完成后调用，而 mounted 钩子在实例挂载到 DOM 后调用。因此，created 钩子调用时间点较早，而 mounted 钩子调用时间点稍后。

## 16. Vue 中，推荐在哪个生命周期发起请求？

推荐：在 created 钩子中进行数据初始化操作，而在 mounted 钩子中进行 DOM 操作，确保 DOM 元素加载完成后再执行相关操作。

## 17. 为什么 Node 在使用 ESModule 时必须加上文件扩展名？

原因：Node.js 采用 CommonJS 模块系统，而 ES6 模块系统采用了静态分析，需要在编译时确定模块依赖关系。因此，ES6 模块系统要求在导入时必须加上文件扩展名。

## 18. package.json 文件中的 devDependencies 和 dependencies 对象有什么区别？

- **devDependencies**：开发依赖项，用于开发和测试阶段，不会被发布到生产环境。
- **dependencies**：生产依赖项，用于生产环境，会被发布到生产环境。

## 19. React Portals 有什么用？

作用：将子组件渲染到父组件以外的 DOM 节点，解决了子组件样式被父组件样式覆盖的问题。

## 20. React 和 react-dom 是什么关系？

关系：react 是 React 库的核心，提供了组件化开发的能力；react-dom 是 React 库的 DOM 渲染部分，负责将 React 组件渲染到 DOM 中。

## 21. MessageChannel 是什么，有什么使用场景？

作用：MessageChannel 是 HTML5 提供的一种异步通信机制，用于在不同的执行上下文（如主线程和 Web Worker）之间传递消息。

使用场景：用于在不同线程之间通信，如在 Web Worker 中处理耗时操作，完成后将结果返回主线程。

#### 示例代码：

```javascript
const channel = new MessageChannel();
const port1 = channel.port1;
const port2 = channel.port2;

port1.onmessage = (event) => {
  console.log("主线程收到消息:", event.data);
};

port2.postMessage("子线程发送消息");
```

## 22. React 中为什么不直接使用 requestIdleCallback?

原因：requestIdleCallback 是浏览器提供的一种异步回调机制，用于在浏览器空闲时执行回调函数。然而，React 是一个基于事件驱动的库，使用 requestIdleCallback 可能会导致性能问题，因为 React 组件的更新是同步的，而 requestIdleCallback 是异步的。如果 React 组件的更新在 requestIdleCallback 回调函数中执行，可能会导致组件状态不一致的问题。

### requestIdleCallback 详细介绍及使用案例

requestIdleCallback 是一个浏览器提供的 API，用于在浏览器空闲时执行回调函数。它的作用是在浏览器渲染下一个帧之前执行回调函数，以避免阻塞浏览器的渲染过程。

使用案例：可以使用 requestIdleCallback 来执行一些耗时的操作，如数据加载、图片预加载等，以避免阻塞浏览器的渲染过程。

#### 示例代码：

```javascript
function loadData() {
  // 模拟耗时操作
  setTimeout(() => {
    console.log("数据加载完成");
  }, 2000);
}

requestIdleCallback(loadData);
```

## 23. 为什么 React 需要 fiber 架构，而 Vue 却不需要？

原因：React 采用了基于 fiber 架构的异步渲染机制，而 Vue 采用了基于虚拟 DOM 的同步渲染机制。因此，React 可以在不阻塞浏览器渲染的情况下进行组件更新，而 Vue 则需要在每次数据变化时重新渲染整个组件树。

## 24. Vue 中子组件是一个 Portal，发生点击事件能冒泡到父组件吗？

原因：Vue 采用了基于虚拟 DOM 的同步渲染机制，因此子组件的点击事件会冒泡到父组件。

### Portal 详细介绍及其使用场景

作用：Portal 是 Vue 提供的一种将子组件渲染到父组件以外的 DOM 节点的机制。当子组件发生点击事件时，事件会冒泡到父组件，因为事件是在 DOM 中传播的。

使用场景：当子组件需要在父组件以外的 DOM 节点上渲染时，如弹窗、下拉菜单等。

#### 示例代码：

```vue
<template>
  <div>
    <button @click="showModal = true">打开弹窗</button>
    <portal to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h2>弹窗标题</h2>
          <p>弹窗内容</p>
          <button @click="showModal = false">关闭弹窗</button>
        </div>
      </div>
    </portal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
```

### javascript 模块化发展

JavaScript 模块化的发展历程可以概括为从早期的无模块规范，到社区自发形成的规范（CommonJS, AMD, CMD, UMD），最后到官方标准（ESM）的过程。

#### 1. 无模块阶段

在早期，JavaScript 脚本通常直接通过 `<script>` 标签引入。

- **缺点**：
  - **全局污染**：所有变量都挂载在全局作用域下，容易发生命名冲突。
  - **依赖模糊**：无法清晰表达模块间的依赖关系。
  - **维护困难**：脚本执行顺序必须严格手动控制。

#### 2. IIFE（立即执行函数表达式）阶段

利用闭包的特性，将变量封装在函数内部，从而避免全局污染。

```javascript
var moduleA = (function () {
  var data = "inner data";
  function getter() {
    return data;
  }
  return { getter };
})();
```

- **特点**：实现了基础的封装和私有变量。

#### 3. CommonJS (CJS)

主要用于服务器端（Node.js）。

- **特点**：
  - **同步加载**：模块加载是同步的，适用于服务器端（文件在磁盘上）。
  - **导出**：使用 `module.exports` 或 `exports`。
  - **导入**：使用 `require()`。
  - **运行时加载**：模块在执行时加载。

```javascript
// math.js
module.exports = { add: (a, b) => a + b };

// main.js
const math = require("./math");
console.log(math.add(1, 2));
```

#### 4. AMD (Asynchronous Module Definition)

由 RequireJS 提出，专门为浏览器环境设计。

- **特点**：
  - **异步加载**：不会阻塞浏览器渲染。
  - **依赖前置**：在定义模块时就声明依赖。

```javascript
define(["module1", "module2"], function (m1, m2) {
  return {
    /* ... */
  };
});
```

#### 5. CMD (Common Module Definition)

由 SeaJS 提出，结合了 CommonJS 和 AMD 的特点。

- **特点**：
  - **依赖就近**：在需要时才 `require`。
  - **延迟执行**：模块代码在 `require` 时才执行。

```javascript
define(function (require, exports, module) {
  var m1 = require("./module1");
  // ...
});
```

#### 6. UMD (Universal Module Definition)

一种通用的模式，旨在兼容 AMD、CommonJS 以及全局变量挂载。

- **原理**：判断当前环境支持哪种规范，自动适配。

#### 7. ESM (ES6 Modules)

ES6 引入的官方标准模块系统。

- **特点**：
  - **静态分析**：在编译时就能确定模块的依赖关系，支持 Tree Shaking。
  - **导入/导出**：使用 `import` 和 `export`。
  - **默认异步**：在浏览器中可以通过 `<script type="module">` 使用。
  - **引用传递**：导出的值是原始值的引用，而不是拷贝（与 CommonJS 不同）。

```javascript
// math.js
export const add = (a, b) => a + b;

// main.js
import { add } from "./math.js";
```

#### 总结对比

| 规范         | 环境    | 加载方式  | 关键字                      |
| :----------- | :------ | :-------- | :-------------------------- |
| **CommonJS** | Node.js | 同步      | `require`, `module.exports` |
| **AMD**      | 浏览器  | 异步      | `define`, `require`         |
| **CMD**      | 浏览器  | 延迟      | `define`, `require`         |
| **ESM**      | 通用    | 静态/异步 | `import`, `export`          |
