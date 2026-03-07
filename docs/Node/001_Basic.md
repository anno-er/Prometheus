# Node.js 基础知识点

### 1. 说说你对Node.js 的理解? 优缺点? 应用场景?

**理解：**
Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境，让 JavaScript 可以脱离浏览器在服务器端运行。它采用事件驱动、非阻塞 I/O 模型，使其轻量且高效。

**优点：**

- 高并发处理能力强，适合 I/O 密集型应用
- 单线程事件循环，资源消耗低
- 前后端统一语言，降低开发成本
- npm 生态系统丰富，模块众多
- 跨平台，支持 Windows、Linux、macOS

**缺点：**

- 不适合 CPU 密集型任务，会阻塞事件循环
- 回调地狱问题（可通过 Promise/async-await 解决）
- 单线程导致无法充分利用多核 CPU（可通过 cluster 模块解决）
- 代码质量参差不齐（npm 包管理）

**应用场景：**

- RESTful API 服务
- 实时应用（聊天、游戏）
- 单页面应用（SPA）服务端渲染
- 流数据处理
- 微服务架构
- 命令行工具开发

---

### 2. 什么是 Node.js 中的 process? 它有哪些方法和应用场景?

**定义：**
`process` 是 Node.js 的全局对象，代表当前 Node.js 进程，无需 `require` 即可使用。

**常用方法/属性：**

| 方法/属性                                   | 说明                     |
| ------------------------------------------- | ------------------------ |
| `process.argv`                              | 命令行参数数组           |
| `process.env`                               | 环境变量对象             |
| `process.cwd()`                             | 当前工作目录             |
| `process.exit([code])`                      | 退出进程                 |
| `process.nextTick(callback)`                | 将回调放入下一个事件循环 |
| `process.pid`                               | 进程 ID                  |
| `process.platform`                          | 操作系统平台             |
| `process.version`                           | Node.js 版本             |
| `process.uptime()`                          | 进程运行时间             |
| `process.memoryUsage()`                     | 内存使用情况             |
| `process.on('exit', callback)`              | 进程退出事件             |
| `process.on('uncaughtException', callback)` | 未捕获异常处理           |

**应用场景：**

- 获取命令行参数
- 读取环境变量配置
- 进程退出清理资源
- 捕获未处理异常
- 性能监控

---

### 3. 什么是 Node.js 的事件循环机制? 它是怎么实现的?

**定义：**
事件循环是 Node.js 实现异步非阻塞 I/O 的核心机制。它负责调度和执行回调函数，使单线程能够处理多个并发请求。

**实现原理：**
事件循环基于 libuv 库实现，分为以下几个阶段：

```
   ┌───────────────────────┐
┌─>│        timers         │ setTimeout/setInterval
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │     pending callbacks │ 执行延迟到下一个循环的 I/O 回调
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │       idle, prepare   │ 内部使用
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │        poll           │ 轮询，执行 I/O 回调
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
│  │        check          │ setImmediate 回调
│  └───────────┬───────────┘
│  ┌───────────┴───────────┐
└──┤    close callbacks    │ close 事件回调
   └───────────────────────┘
```

**微任务队列：**

- `process.nextTick` 队列（优先级最高）
- Promise 队列

每个阶段完成后，会检查微任务队列并执行。

---

### 4. Node.js 有哪些全局对象? 它们分别有什么作用?

| 全局对象                  | 作用                     |
| ------------------------- | ------------------------ |
| `global`                  | 全局命名空间对象         |
| `process`                 | 当前进程信息与控制       |
| `console`                 | 控制台输出               |
| `Buffer`                  | 处理二进制数据           |
| `__filename`              | 当前文件绝对路径         |
| `__dirname`               | 当前文件所在目录绝对路径 |
| `module`                  | 当前模块对象             |
| `exports`                 | 模块导出对象             |
| `require()`               | 加载模块函数             |
| `setTimeout/setInterval`  | 定时器函数               |
| `setImmediate`            | 立即执行回调             |
| `URL`                     | URL 处理                 |
| `TextEncoder/TextDecoder` | 文本编解码               |

---

### 5. 怎么调试 Node.js 程序?

**方法一：console.log 调试**

```javascript
console.log("变量值:", variable);
console.table(arrayData);
console.time("耗时");
console.timeEnd("耗时");
```

**方法二：Node.js 内置调试器**

```bash
node inspect app.js
# 常用命令: cont, next, step, out, watch, repl
```

**方法三：Chrome DevTools**

```bash
node --inspect app.js
node --inspect-brk app.js  # 首行断点
# 打开 chrome://inspect
```

**方法四：VS Code 调试**
在 `.vscode/launch.json` 配置：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/app.js"
    }
  ]
}
```

**方法五：第三方工具**

- node-inspector
- iron-node
- ndb

---

### 6. 什么是 Node.js? 它的主要特点是什么? 适用于哪些场景?

**定义：**
Node.js 是一个基于 V8 引擎的 JavaScript 运行时环境，使用事件驱动、非阻塞 I/O 模型。

**主要特点：**

- **单线程**：主线程单线程执行
- **事件驱动**：基于事件循环模型
- **非阻塞 I/O**：I/O 操作异步执行
- **跨平台**：支持多操作系统
- **模块化**：CommonJS 模块系统
- **npm 生态**：丰富的包管理器

**适用场景：**

- 实时应用（即时通讯、在线协作）
- API 服务与微服务
- 流媒体服务
- 单页面应用服务端
- 命令行工具
- 前端构建工具

---

### 7. 如何在 Node.js 中创建一个简单的 HTTP 服务器?

**方式一：使用 http 模块**

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end("Hello World!");
});

server.listen(3000, () => {
  console.log("服务器运行在 http://localhost:3000");
});
```

**方式二：使用 Express 框架**

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("服务器运行在 http://localhost:3000");
});
```

---

### 8. 在 Node.js 中, 如何导入和导出模块?

**CommonJS 方式：**

导出：

```javascript
// 方式一：module.exports
module.exports = { foo, bar };

// 方式二：exports（注意不能覆盖 exports）
exports.foo = foo;
exports.bar = bar;

// 方式三：导出单个值
module.exports = function () {};
```

导入：

```javascript
const module1 = require("./module1");
const { foo, bar } = require("./module2");
```

**ES Modules 方式：**

导出：

```javascript
// 命名导出
export const foo = "foo";
export function bar() {}

// 默认导出
export default { foo, bar };
```

导入：

```javascript
import module1 from "./module1.mjs";
import { foo, bar } from "./module2.mjs";
```

---

### 9. Node.js 中, 同步和异步代码有什么区别?

| 特性     | 同步代码           | 异步代码                     |
| -------- | ------------------ | ---------------------------- |
| 执行方式 | 阻塞式，顺序执行   | 非阻塞，并行执行             |
| 返回结果 | 直接返回           | 通过回调/Promise/async-await |
| 性能影响 | 会阻塞事件循环     | 不阻塞事件循环               |
| 适用场景 | 启动配置、简单脚本 | I/O 操作、网络请求           |

**示例：**

```javascript
// 同步读取
const data = fs.readFileSync("file.txt", "utf8");
console.log("文件内容:", data);

// 异步读取 - 回调方式
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log("文件内容:", data);
});

// 异步读取 - Promise 方式
const data = await fs.promises.readFile("file.txt", "utf8");
console.log("文件内容:", data);
```

---

### 10. 什么是 npm? 如何使用它来管理项目的依赖?

**定义：**
npm (Node Package Manager) 是 Node.js 的包管理工具，用于安装、管理、分享 JavaScript 包。

**常用命令：**

```bash
# 初始化项目
npm init
npm init -y  # 使用默认配置

# 安装依赖
npm install <package>        # 本地安装
npm install <package> -g     # 全局安装
npm install <package> --save-dev  # 开发依赖

# 安装所有依赖
npm install

# 更新依赖
npm update <package>
npm outdated  # 查看过期依赖

# 卸载依赖
npm uninstall <package>

# 查看信息
npm list              # 已安装依赖
npm view <package>    # 包信息
npm search <package>  # 搜索包

# 运行脚本
npm run <script>
npm start / npm test

# 发布包
npm publish
```

**package.json 关键字段：**

```json
{
  "dependencies": {}, // 生产依赖
  "devDependencies": {}, // 开发依赖
  "peerDependencies": {}, // 同级依赖
  "scripts": {} // 脚本命令
}
```

---

### 11. Node.js 中的回调函数是什么?

**定义：**
回调函数是作为参数传递给另一个函数的函数，在异步操作完成后被调用。

**特点：**

- 实现异步编程
- 非阻塞执行
- 错误优先模式（Error-First Callback）

**示例：**

```javascript
// 错误优先回调
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("读取失败:", err);
    return;
  }
  console.log("文件内容:", data);
});

// 自定义回调函数
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { data: "success" });
  }, 1000);
}

fetchData((err, result) => {
  if (err) return console.error(err);
  console.log(result);
});
```

**回调地狱问题：**

```javascript
// 回调地狱
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      // 嵌套过深
    });
  });
});

// 解决方案：Promise / async-await
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
```

---

### 12. 如何在 Node.js 中捕获和处理异常?

**方式一：try-catch（同步代码）**

```javascript
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error("解析错误:", error.message);
}
```

**方式二：回调错误处理**

```javascript
fs.readFile("file.txt", (err, data) => {
  if (err) {
    console.error("读取错误:", err);
    return;
  }
  // 处理数据
});
```

**方式三：Promise catch**

```javascript
fs.promises
  .readFile("file.txt")
  .then((data) => {})
  .catch((err) => console.error(err));

// async-await
try {
  const data = await fs.promises.readFile("file.txt");
} catch (err) {
  console.error(err);
}
```

**方式四：全局异常处理**

```javascript
// 未捕获异常
process.on("uncaughtException", (err) => {
  console.error("未捕获异常:", err);
  process.exit(1);
});

// 未处理的 Promise 拒绝
process.on("unhandledRejection", (reason, promise) => {
  console.error("未处理的 Promise 拒绝:", reason);
});

// 使用 domain 模块（已废弃，不推荐）
const domain = require("domain");
const d = domain.create();
d.on("error", (err) => console.error(err));
d.run(() => {
  /* 代码 */
});
```

---

### 13. Node.js 中的 Buffer 对象是什么? 它有什么作用?

**定义：**
Buffer 是 Node.js 提供的用于处理二进制数据的类，类似于整数数组，但对应 V8 堆内存之外的一块原始内存。

**作用：**

- 处理 TCP 流、文件流等二进制数据
- 编码转换（UTF-8、Base64、Hex 等）
- 数据拼接与处理

**常用方法：**

```javascript
// 创建 Buffer
const buf1 = Buffer.alloc(10); // 分配 10 字节，填充 0
const buf2 = Buffer.allocUnsafe(10); // 分配 10 字节，不初始化
const buf3 = Buffer.from("hello"); // 从字符串创建
const buf4 = Buffer.from([1, 2, 3]); // 从数组创建

// 写入与读取
buf1.write("hello");
console.log(buf1.toString()); // 输出字符串
console.log(buf1.toJSON()); // 输出 JSON

// 编码转换
const base64 = Buffer.from("hello").toString("base64");
const decoded = Buffer.from(base64, "base64").toString();

// 拼接
const concat = Buffer.concat([buf3, buf4]);

// 比较
buf1.equals(buf2);
buf1.compare(buf2);

// 切片
const slice = buf1.slice(0, 5);
```

---

### 14. 如何在 Node.js 中解析 JSON 数据?

**解析 JSON 字符串：**

```javascript
const jsonString = '{"name": "张三", "age": 25}';

try {
  const obj = JSON.parse(jsonString);
  console.log(obj.name); // 张三
} catch (error) {
  console.error("JSON 解析错误:", error.message);
}
```

**序列化为 JSON：**

```javascript
const obj = { name: "张三", age: 25 };

const json = JSON.stringify(obj);
const prettyJson = JSON.stringify(obj, null, 2); // 格式化输出
```

**从文件读取 JSON：**

```javascript
// 方式一
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

// 方式二：异步
const data = await fs.promises.readFile("data.json", "utf8");
const obj = JSON.parse(data);

// 方式三：require（会缓存）
const data = require("./data.json");
```

---

### 15. 什么是 Node.js 中的模块加载机制?

**加载流程：**

1. **解析路径**：将模块名转换为绝对路径
2. **缓存检查**：检查是否已加载过
3. **文件定位**：查找文件扩展名（.js、.json、.node）
4. **编译执行**：编译并执行模块代码
5. **缓存模块**：将模块缓存以供后续使用

**文件查找策略：**

```
require('http')     → 核心模块
require('./lib')    → 相对路径
require('/lib')     → 绝对路径
require('express')  → node_modules 查找
```

**node_modules 查找规则：**

```
当前目录/node_modules/
父目录/node_modules/
祖父目录/node_modules/
...
系统全局 node_modules/
```

**模块包装函数：**

```javascript
(function (exports, require, module, __filename, __dirname) {
  // 模块代码
});
```

**缓存机制：**

```javascript
// 查看缓存
console.log(require.cache);

// 删除缓存
delete require.cache[require.resolve("./module")];
```

---

### 16. 什么是 Node.js 中的 REPL?

**定义：**
REPL (Read-Eval-Print-Loop) 是 Node.js 提供的交互式解释器，用于快速测试和调试 JavaScript 代码。

**启动方式：**

```bash
node
# 或
node --experimental-repl-await  # 支持 await
```

**常用命令：**
| 命令 | 说明 |
|------|------|
| `.help` | 显示帮助 |
| `.exit` | 退出 REPL |
| `.save filename` | 保存会话到文件 |
| `.load filename` | 加载文件到会话 |
| `.clear` | 清除上下文 |
| `.break` | 退出多行输入 |
| `.editor` | 进入编辑器模式 |

**示例：**

```javascript
$ node
> const a = 1;
undefined
> a + 2
3
> .save session.js
Session saved to: session.js
> .exit
```

---

### 17. 什么是子进程? 如何在 Node.js 中创建子进程?

**定义：**
子进程是主进程创建的独立进程，用于执行外部命令或运行其他 Node.js 脚本，实现多进程并行处理。

**创建方式：**

**spawn - 流式输出：**

```javascript
const { spawn } = require("child_process");

const ls = spawn("ls", ["-la"]);

ls.stdout.on("data", (data) => {
  console.log(`输出: ${data}`);
});

ls.stderr.on("data", (data) => {
  console.error(`错误: ${data}`);
});

ls.on("close", (code) => {
  console.log(`进程退出码: ${code}`);
});
```

**exec - 缓冲输出：**

```javascript
const { exec } = require("child_process");

exec("ls -la", (error, stdout, stderr) => {
  if (error) {
    console.error(`错误: ${error.message}`);
    return;
  }
  console.log(`输出: ${stdout}`);
});

// Promise 版本
const { promisify } = require("util");
const execAsync = promisify(require("child_process").exec);
const { stdout } = await execAsync("ls -la");
```

**execFile - 执行文件：**

```javascript
const { execFile } = require("child_process");
execFile("node", ["script.js"], (error, stdout) => {
  console.log(stdout);
});
```

**fork - 创建 Node 子进程：**

```javascript
const { fork } = require("child_process");

const child = fork("child.js");

child.on("message", (msg) => {
  console.log("收到消息:", msg);
});

child.send({ hello: "world" });
```

---

### 18. 如何使用 Node.js 发送 HTTP 请求? (GET 和 POST)

**方式一：使用 http/https 模块**

```javascript
const https = require("https");

// GET 请求
https
  .get("https://api.example.com/data", (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res.on("end", () => console.log(JSON.parse(data)));
  })
  .on("error", console.error);

// POST 请求
const options = {
  hostname: "api.example.com",
  path: "/users",
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const req = https.request(options, (res) => {
  let data = "";
  res.on("data", (chunk) => (data += chunk));
  res.on("end", () => console.log(data));
});

req.write(JSON.stringify({ name: "张三" }));
req.end();
```

**方式二：使用 fetch（Node 18+）**

```javascript
// GET
const response = await fetch("https://api.example.com/data");
const data = await response.json();

// POST
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "张三" }),
});
```

**方式三：使用 axios**

```javascript
const axios = require("axios");

// GET
const { data } = await axios.get("https://api.example.com/data");

// POST
const { data } = await axios.post("https://api.example.com/users", {
  name: "张三",
});
```

---

### 19. Node.js 中的 require 和 import 有什么区别?

| 特性       | require (CommonJS)       | import (ES Modules)                 |
| ---------- | ------------------------ | ----------------------------------- |
| 加载时机   | 运行时加载               | 编译时静态分析                      |
| 加载方式   | 同步加载                 | 异步加载                            |
| 导出方式   | module.exports / exports | export / export default             |
| 引入方式   | require()                | import                              |
| 变量绑定   | 值拷贝                   | 值引用（绑定）                      |
| 文件扩展名 | .js, .json, .node        | .mjs 或 package.json type: "module" |
| 条件加载   | 支持                     | 不支持（静态）                      |
| 循环依赖   | 只输出已执行部分         | 需要特殊处理                        |

**示例对比：**

```javascript
// CommonJS
const fs = require("fs");
module.exports = { foo: 1 };

// ES Modules
import fs from "fs";
export const foo = 1;
```

---

### 20. Node.js 中 require 方法是同步还是异步操作? 为什么?

**答案：同步操作**

**原因：**

1. **模块初始化顺序**：确保模块按依赖顺序加载
2. **简化代码**：无需回调或 Promise 处理
3. **性能考虑**：模块通常在启动时加载，同步加载更简单高效
4. **历史原因**：CommonJS 规范设计为同步

**示例：**

```javascript
// require 是同步的
const fs = require("fs"); // 立即返回
console.log("模块已加载");

// 如果需要异步加载模块
const fs = await import("fs"); // ES Modules 动态导入
```

**注意：**

- 同步加载只在首次 require 时发生
- 后续 require 会从缓存读取，非常快
- 生产环境应避免在运行时动态 require

---

### 21. 什么是 CommonJS 模块规范? Node.js 如何实现它?

**定义：**
CommonJS 是 JavaScript 模块化规范，定义了模块定义、引用和导出的标准。

**核心规范：**

- `require()`：导入模块
- `module.exports`：导出模块
- `exports`：导出对象的引用

**Node.js 实现原理：**

1. **模块包装：**

```javascript
// Node.js 自动包装模块代码
(function (exports, require, module, __filename, __dirname) {
  // 模块代码
});
```

2. **Module 类：**

```javascript
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}
```

3. **require 实现：**

```javascript
Module.prototype.require = function (id) {
  return Module._load(id, this, false);
};

Module._load = function (request, parent, isMain) {
  const filename = Module._resolveFilename(request, parent);
  const cachedModule = Module._cache[filename];
  if (cachedModule) return cachedModule.exports;

  const module = new Module(filename, parent);
  Module._cache[filename] = module;
  module.load(filename);

  return module.exports;
};
```

---

### 22. 如何在 Node.js 中处理多线程或多进程操作？

**多进程方式：**

**cluster 模块：**

```javascript
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    cluster.fork(); // 重启进程
  });
} else {
  require("./server"); // 工作进程
}
```

**child_process：**

```javascript
const { fork } = require("child_process");
const workers = [];
for (let i = 0; i < 4; i++) {
  workers.push(fork("./worker.js"));
}
```

**多线程方式：**

**worker_threads 模块：**

```javascript
// 主线程
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js", {
  workerData: { num: 100 },
});

worker.on("message", (result) => {
  console.log("结果:", result);
});

// worker.js
const { workerData, parentPort } = require("worker_threads");
const result = heavyComputation(workerData.num);
parentPort.postMessage(result);
```

---

### 23. 什么是模块循环？如何在 Node.js 中避免或解决它？

**定义：**
模块循环依赖是指模块 A 依赖模块 B，模块 B 又依赖模块 A，形成循环。

**问题示例：**

```javascript
// a.js
const b = require("./b");
console.log("a.js:", b.name); // undefined
exports.name = "A";

// b.js
const a = require("./a");
console.log("b.js:", a.name); // undefined
exports.name = "B";
```

**解决方案：**

1. **延迟加载：**

```javascript
// a.js
exports.name = "A";
exports.init = function () {
  const b = require("./b"); // 延迟加载
  console.log(b.name);
};
```

2. **重构代码结构：**

```javascript
// 创建第三个模块 c.js
exports.shared = "shared data";

// a.js 和 b.js 都依赖 c.js
```

3. **使用依赖注入：**

```javascript
// a.js
exports.init = function (b) {
  console.log(b.name);
};

// main.js
const a = require("./a");
const b = require("./b");
a.init(b);
```

4. **导出函数而非对象：**

```javascript
// a.js
module.exports = function () {
  const b = require("./b");
  return b.name + " + A";
};
```

---

### 24. 如何在 Node.js 中实现文件的压缩和解压缩？

**使用 zlib 模块：**

**压缩文件：**

```javascript
const zlib = require("zlib");
const fs = require("fs");
const pipeline = require("stream").pipeline;

// Gzip 压缩
const gzip = zlib.createGzip();
const input = fs.createReadStream("input.txt");
const output = fs.createWriteStream("input.txt.gz");

pipeline(input, gzip, output, (err) => {
  if (err) console.error("压缩失败:", err);
  else console.log("压缩成功");
});

// 同步方式
const compressed = zlib.gzipSync(fs.readFileSync("input.txt"));
fs.writeFileSync("input.txt.gz", compressed);
```

**解压文件：**

```javascript
const gunzip = zlib.createGunzip();
const input = fs.createReadStream("input.txt.gz");
const output = fs.createWriteStream("output.txt");

pipeline(input, gunzip, output, (err) => {
  if (err) console.error("解压失败:", err);
  else console.log("解压成功");
});
```

**压缩目录（使用 archiver）：**

```javascript
const archiver = require("archiver");
const output = fs.createWriteStream("archive.zip");
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => console.log("压缩完成"));
archive.pipe(output);
archive.directory("folder/", false);
archive.finalize();
```

---

### 25. 有哪些常用的 Node.js 测试框架？如何编写测试用例？

**常用测试框架：**

| 框架         | 特点                            |
| ------------ | ------------------------------- |
| Jest         | Facebook 出品，零配置，功能全面 |
| Mocha        | 灵活，需要配合断言库            |
| Jasmine      | BDD 风格，内置断言              |
| Tape         | 简单轻量                        |
| Node.js 内置 | Node 18+ 内置 test 模块         |

**Jest 示例：**

```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// math.test.js
const { add } = require("./math");

describe("数学函数测试", () => {
  test("1 + 2 应该等于 3", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("负数相加", () => {
    expect(add(-1, -2)).toBe(-3);
  });
});
```

**Mocha + Chai 示例：**

```javascript
const { expect } = require("chai");
const { add } = require("./math");

describe("数学函数测试", () => {
  it("1 + 2 应该等于 3", () => {
    expect(add(1, 2)).to.equal(3);
  });
});
```

**Node.js 内置测试（18+）：**

```javascript
const test = require("node:test");
const assert = require("node:assert");

test("加法测试", () => {
  assert.strictEqual(add(1, 2), 3);
});
```

---

### 26. 什么是 package-lock.json 文件？它的作用是什么？

**定义：**
package-lock.json 是 npm 自动生成的文件，记录项目依赖树的精确版本信息。

**作用：**

1. **版本锁定**：确保团队成员和 CI/CD 环境安装相同版本的依赖
2. **依赖树记录**：记录完整的依赖树结构
3. **安装加速**：npm 可以跳过元数据解析
4. **可重复构建**：保证构建结果一致

**关键字段：**

```json
{
  "name": "project",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": { "dependencies": { "express": "^4.18.0" } },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz",
      "integrity": "sha512-..."
    }
  }
}
```

**注意事项：**

- 应该提交到版本控制
- 不要手动编辑
- 使用 `npm ci` 而非 `npm install` 进行精确安装

---

### 27. 如何在 Node.js 中使用 WebSocket 实现实时通信？

**使用 ws 库：**

**服务端：**

```javascript
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("客户端已连接");

  ws.on("message", (message) => {
    console.log("收到消息:", message);
    ws.send(`服务器回复: ${message}`);
  });

  ws.on("close", () => {
    console.log("客户端断开连接");
  });

  // 广播给所有客户端
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send("欢迎新用户");
    }
  });
});
```

**客户端：**

```javascript
const WebSocket = require("ws");
const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  ws.send("Hello Server");
});

ws.on("message", (data) => {
  console.log("收到消息:", data);
});
```

**使用 Express + ws：**

```javascript
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (msg) => ws.send(msg));
});

server.listen(3000);
```

---

### 28. 在 Node.js 中如何进行数据库操作，比如使用什么 DB 和 ORM？

**常用数据库：**

| 数据库     | 驱动/ORM                   |
| ---------- | -------------------------- |
| MySQL      | mysql2, sequelize, typeorm |
| PostgreSQL | pg, typeorm, prisma        |
| MongoDB    | mongoose, mongodb          |
| Redis      | ioredis, redis             |
| SQLite     | better-sqlite3, sqlite3    |

**MySQL + Sequelize：**

```javascript
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
});

// CRUD 操作
await User.create({ name: "张三", email: "zhang@example.com" });
const users = await User.findAll();
await User.update({ name: "李四" }, { where: { id: 1 } });
await User.destroy({ where: { id: 1 } });
```

**MongoDB + Mongoose：**

```javascript
const mongoose = require("mongoose");

await mongoose.connect("mongodb://localhost/test");

const User = mongoose.model("User", {
  name: String,
  email: String,
});

// CRUD 操作
await User.create({ name: "张三", email: "zhang@example.com" });
const users = await User.find();
await User.findByIdAndUpdate(id, { name: "李四" });
await User.findByIdAndDelete(id);
```

**Prisma（现代 ORM）：**

```javascript
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: { name: "张三", email: "zhang@example.com" },
});

const users = await prisma.user.findMany();
```

---

### 29. ES6 模块和 CommonJS 模块在 Node.js 中有什么区别？

| 特性       | CommonJS                 | ES Modules             |
| ---------- | ------------------------ | ---------------------- |
| 语法       | require / module.exports | import / export        |
| 加载时机   | 运行时                   | 编译时                 |
| 加载方式   | 同步                     | 异步                   |
| 值绑定     | 值拷贝                   | 实时绑定               |
| this 指向  | 指向当前模块             | 指向 undefined         |
| 顶层 await | 不支持                   | 支持                   |
| 循环依赖   | 返回部分导出             | 需要特殊处理           |
| 文件类型   | .js                      | .mjs 或 type: "module" |

**值绑定差异：**

```javascript
// CommonJS - 值拷贝
// counter.js
let count = 0;
module.exports = { count, increment: () => count++ };

// main.js
const counter = require("./counter");
counter.increment();
console.log(counter.count); // 0（拷贝的值不变）

// ES Modules - 实时绑定
// counter.mjs
export let count = 0;
export const increment = () => count++;

// main.mjs
import { count, increment } from "./counter.mjs";
increment();
console.log(count); // 1（实时绑定）
```

**互操作：**

```javascript
// 在 ES Modules 中导入 CommonJS
import cjsModule from "./cjs.cjs";

// 在 CommonJS 中导入 ES Modules
const esm = await import("./esm.mjs");
```

---

### 30. 在 Node.js 中如何处理文件上传和下载？

**文件上传（使用 multer）：**

```javascript
const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// 配置存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    cb(null, allowedTypes.includes(file.mimetype));
  },
});

// 单文件上传
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});

// 多文件上传
app.post("/uploads", upload.array("files", 10), (req, res) => {
  res.json({ files: req.files });
});
```

**文件下载：**

```javascript
const fs = require("fs");

// 方式一：res.download
app.get("/download/:filename", (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  res.download(filePath);
});

// 方式二：流式下载
app.get("/stream/:filename", (req, res) => {
  const filePath = `uploads/${req.params.filename}`;
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Content-Length": stat.size,
    "Content-Disposition": `attachment; filename="${req.params.filename}"`,
  });

  fs.createReadStream(filePath).pipe(res);
});
```

---

### 31. 在 Node.js 中如何实现定时任务？有哪些方法？

**方式一：setTimeout / setInterval**

```javascript
// 单次执行
setTimeout(() => {
  console.log("3秒后执行");
}, 3000);

// 重复执行
const timer = setInterval(() => {
  console.log("每5秒执行一次");
}, 5000);

clearInterval(timer); // 停止
```

**方式二：node-cron**

```javascript
const cron = require("node-cron");

// 每分钟执行
cron.schedule("* * * * *", () => {
  console.log("每分钟执行");
});

// 每天凌晨 2 点执行
cron.schedule("0 2 * * *", () => {
  console.log("每天凌晨2点执行");
});

// Cron 表达式: 秒 分 时 日 月 星期
// '0 0 * * *' - 每小时
// '0 0 0 * *' - 每天
// '0 0 0 * * 1' - 每周一
```

**方式三：node-schedule**

```javascript
const schedule = require("node-schedule");

// 指定时间执行
const job = schedule.scheduleJob("2024-12-31 23:59:59", () => {
  console.log("新年倒计时");
});

// 规则执行
schedule.scheduleJob({ hour: 10, minute: 30 }, () => {
  console.log("每天10:30执行");
});

job.cancel(); // 取消任务
```

**方式四：agenda（持久化定时任务）**

```javascript
const Agenda = require("agenda");

const agenda = new Agenda({ db: { address: "mongodb://localhost/agenda" } });

agenda.define("send email", async (job) => {
  console.log("发送邮件给:", job.attrs.data.to);
});

await agenda.start();
await agenda.every("3 minutes", "send email", { to: "user@example.com" });
```

---

### 32. 什么是 Socket.io？如何在 Node.js 中使用它实现实时通信？

**定义：**
Socket.io 是一个基于 WebSocket 的实时双向通信库，提供降级兼容、自动重连、房间等功能。

**服务端实现：**

```javascript
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("用户连接:", socket.id);

  // 接收消息
  socket.on("chat message", (msg) => {
    console.log("消息:", msg);

    // 发送给所有客户端
    io.emit("chat message", msg);

    // 发送给特定客户端
    socket.emit("private", "私密消息");

    // 广播给其他客户端
    socket.broadcast.emit("chat message", msg);
  });

  // 加入房间
  socket.on("join room", (room) => {
    socket.join(room);
    io.to(room).emit("message", "有人加入房间");
  });

  // 断开连接
  socket.on("disconnect", () => {
    console.log("用户断开:", socket.id);
  });
});

server.listen(3000);
```

**客户端实现：**

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io();

  socket.on("connect", () => {
    console.log("已连接");
  });

  socket.emit("chat message", "Hello");

  socket.on("chat message", (msg) => {
    console.log("收到:", msg);
  });
</script>
```

---

### 33. 如何在 Node.js 中实现断言？

**使用 assert 模块：**

```javascript
const assert = require("assert");

// 相等断言
assert.strictEqual(1 + 1, 2); // 严格相等
assert.deepStrictEqual({ a: 1 }, { a: 1 }); // 深度相等

// 不等断言
assert.notStrictEqual(1, 2);
assert.notDeepStrictEqual({ a: 1 }, { b: 1 });

// 真值断言
assert.ok(true);
assert(true, "值应该为真");

// 异常断言
assert.throws(() => {
  throw new Error("错误");
}, Error);

assert.doesNotThrow(() => {
  // 不抛出异常的代码
});

// 异步断言
assert.rejects(async () => {
  throw new Error("异步错误");
}, Error);

// 自定义错误消息
assert.strictEqual(1, 1, "1 应该等于 1");
```

**使用 expect 风格（chai）：**

```javascript
const { expect } = require("chai");

expect(1 + 1).to.equal(2);
expect([1, 2, 3]).to.include(2);
expect({ a: 1 }).to.have.property("a");
expect(() => {
  throw new Error();
}).to.throw();
```

---

### 34. 如何在 Node.js 中实现纳秒级的高精度计时？

**使用 process.hrtime()：**

```javascript
// 旧版本
const start = process.hrtime();
// 执行代码
const diff = process.hrtime(start);
console.log(`耗时: ${diff[0]}秒 ${diff[1]}纳秒`);
console.log(`总纳秒: ${diff[0] * 1e9 + diff[1]}`);

// 新版本（推荐）
const start = process.hrtime.bigint();
// 执行代码
const end = process.hrtime.bigint();
console.log(`耗时: ${end - start} 纳秒`);
console.log(`耗时: ${Number(end - start) / 1e6} 毫秒`);
```

**使用 performance API：**

```javascript
const { performance } = require("perf_hooks");

const start = performance.now();
// 执行代码
const end = performance.now();
console.log(`耗时: ${end - start} 毫秒`);

// 高精度时间戳
console.log(performance.timeOrigin);
console.log(performance.now());
```

**性能测量标记：**

```javascript
const { performance, PerformanceObserver } = require("perf_hooks");

performance.mark("start");
// 执行代码
performance.mark("end");
performance.measure("执行时间", "start", "end");

const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}ms`);
  });
});
observer.observe({ entryTypes: ["measure"] });
```

---

### 35. 如何在 Node.js 中实现数据的缓存，以提高性能？

**方式一：内存缓存**

```javascript
class MemoryCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 60000) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new MemoryCache();
cache.set("user:1", { name: "张三" }, 60000);
const user = cache.get("user:1");
```

**方式二：node-cache**

```javascript
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

cache.set("key", "value");
const value = cache.get("key");
cache.del("key");
cache.flushAll();
```

**方式三：Redis 缓存**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

// 设置缓存
await redis.set("user:1", JSON.stringify({ name: "张三" }), "EX", 3600);

// 获取缓存
const data = await redis.get("user:1");
if (data) {
  return JSON.parse(data);
}

// 缓存穿透保护
const result = await redis.get("key");
if (result === null) {
  const data = await db.query();
  await redis.set("key", JSON.stringify(data), "EX", 300);
}
```

---

### 36. 什么是 Node.js 的中间件？有哪些常用的中间件？

**定义：**
中间件是处理 HTTP 请求和响应的函数链，每个中间件可以访问请求对象、响应对象和下一个中间件函数。

**中间件模式：**

```javascript
function middleware(req, res, next) {
  // 前置处理
  console.log("请求:", req.url);

  // 调用下一个中间件
  next();

  // 后置处理
  console.log("响应完成");
}
```

**常用中间件：**

| 中间件               | 用途                |
| -------------------- | ------------------- |
| express.json()       | 解析 JSON 请求体    |
| express.urlencoded() | 解析 URL 编码请求体 |
| cors                 | 处理跨域请求        |
| helmet               | 安全头设置          |
| morgan               | 请求日志            |
| compression          | 响应压缩            |
| express-rate-limit   | 请求限流            |
| body-parser          | 请求体解析          |
| cookie-parser        | Cookie 解析         |
| express-session      | Session 管理        |
| passport             | 身份认证            |
| multer               | 文件上传            |

---

### 37. 如何编写自定义的 Node.js 中间件？

**基础中间件：**

```javascript
function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`);
  });

  next();
}

app.use(logger);
```

**带配置的中间件：**

```javascript
function rateLimit(options = {}) {
  const { windowMs = 60000, max = 100 } = options;
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, startTime: now });
    } else {
      const data = requests.get(ip);
      if (now - data.startTime > windowMs) {
        data.count = 1;
        data.startTime = now;
      } else {
        data.count++;
      }

      if (data.count > max) {
        return res.status(429).json({ error: "请求过于频繁" });
      }
    }

    next();
  };
}

app.use(rateLimit({ windowMs: 60000, max: 100 }));
```

**异步中间件：**

```javascript
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users);
  }),
);
```

**错误处理中间件：**

```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "服务器错误",
    },
  });
}

app.use(errorHandler);
```

---

### 38. 有哪些常用的 Node.js 开发框架？分别有什么特点？

| 框架         | 特点                         | 适用场景             |
| ------------ | ---------------------------- | -------------------- |
| **Express**  | 轻量、灵活、生态丰富         | 中小型项目、API 服务 |
| **Koa**      | 现代、async/await、洋葱模型  | 现代化项目           |
| **NestJS**   | TypeScript、依赖注入、模块化 | 企业级应用           |
| **Fastify**  | 高性能、Schema 验证          | 高性能 API           |
| **Hapi**     | 配置驱动、插件系统           | 企业级应用           |
| **Egg.js**   | 企业级、约定优于配置         | 企业级应用           |
| **Next.js**  | SSR、SSG、React 集成         | 全栈 React 应用      |
| **Nuxt.js**  | SSR、SSG、Vue 集成           | 全栈 Vue 应用        |
| **AdonisJS** | 全功能、类似 Laravel         | 全栈应用             |
| **Strapi**   | 无头 CMS                     | 内容管理             |

**示例对比：**

```javascript
// Express
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("Hello"));

// Koa
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => (ctx.body = "Hello"));

// Fastify
const fastify = require("fastify")();
fastify.get("/", async (req, reply) => "Hello");

// NestJS
@Controller()
class AppController {
  @Get()
  root() {
    return "Hello";
  }
}
```

---

### 39. 在 Node.js 中，如何处理静态文件的服务？

**使用 express.static：**

```javascript
const express = require("express");
const app = express();

// 基础用法
app.use(express.static("public"));

// 指定虚拟路径
app.use("/static", express.static("public"));

// 多个静态目录
app.use(express.static("public"));
app.use(express.static("files"));

// 配置选项
app.use(
  "/assets",
  express.static("public", {
    dotfiles: "ignore",
    etag: true,
    extensions: ["htm", "html"],
    index: "index.html",
    lastModified: true,
    maxAge: "1d",
    redirect: true,
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.set("Cache-Control", "no-cache");
      }
    },
  }),
);
```

**使用 http 模块：**

```javascript
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, "public", req.url);
  const extname = path.extname(filePath);
  const contentTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
  };

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentTypes[extname] });
      res.end(content);
    }
  });
});
```

---

### 40. 如何在 Node.js 中实现 OAuth 认证？

**使用 passport 实现 OAuth：**

```javascript
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

const app = express();

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// 配置 Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // 查找或创建用户
      User.findOrCreate({ googleId: profile.id }, (err, user) => {
        return done(err, user);
      });
    },
  ),
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

// 路由
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  },
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
```

**手动实现 OAuth 2.0：**

```javascript
const axios = require("axios");

// 步骤1：重定向到授权页面
app.get("/auth/github", (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: "http://localhost:3000/auth/github/callback",
    scope: "user:email",
  });
  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
});

// 步骤2：处理回调，获取 token
app.get("/auth/github/callback", async (req, res) => {
  const { code } = req.query;

  // 用 code 换取 access_token
  const { data } = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: "application/json" } },
  );

  // 使用 access_token 获取用户信息
  const user = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });

  res.json(user.data);
});
```

---

### 41. Node.js 中的守护进程是如何实现的？

**定义：**
守护进程是在后台运行的进程，不依附于终端，通常用于长期运行的服务。

**实现方式：**

**方式一：使用 nohup**

```bash
nohup node app.js > output.log 2>&1 &
```

**方式二：使用 PM2**

```bash
# 安装
npm install -g pm2

# 启动
pm2 start app.js --name "my-app"

# 常用命令
pm2 list
pm2 logs
pm2 restart my-app
pm2 stop my-app
pm2 delete my-app
pm2 monit

# 开机自启
pm2 startup
pm2 save
```

**方式三：代码实现守护进程**

```javascript
const { spawn } = require("child_process");
const fs = require("fs");

function daemonize() {
  // 1. 创建子进程
  const child = spawn(process.argv[0], [process.argv[1]], {
    detached: true,
    stdio: ["ignore", fs.openSync("out.log", "a"), fs.openSync("err.log", "a")],
  });

  // 2. 父进程退出
  child.unref();
  process.exit(0);
}

// 检查是否为守护进程
if (process.env.DAEMON !== "true") {
  process.env.DAEMON = "true";
  daemonize();
} else {
  // 主程序逻辑
  require("./server");
}
```

**方式四：使用 systemd**

```ini
# /etc/systemd/system/nodeapp.service
[Unit]
Description=Node.js Application
After=network.target

[Service]
Type=simple
User=node
WorkingDirectory=/app
ExecStart=/usr/bin/node /app/server.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

```bash
systemctl start nodeapp
systemctl enable nodeapp
```

---

### 42. 如何在 Node.js 中处理文件系统的监控，例如检测文件的变化？

**使用 fs.watch：**

```javascript
const fs = require("fs");

// 监控文件
fs.watch("file.txt", (eventType, filename) => {
  console.log(`事件类型: ${eventType}`);
  console.log(`文件名: ${filename}`);
});

// 监控目录
fs.watch("./src", { recursive: true }, (eventType, filename) => {
  console.log(`${filename} 发生了 ${eventType} 事件`);
});
```

**使用 fs.watchFile：**

```javascript
fs.watchFile("file.txt", (curr, prev) => {
  console.log(`当前修改时间: ${curr.mtime}`);
  console.log(`上次修改时间: ${prev.mtime}`);

  if (curr.mtime !== prev.mtime) {
    console.log("文件内容已改变");
  }
});

// 停止监控
fs.unwatchFile("file.txt");
```

**使用 chokidar（推荐）：**

```javascript
const chokidar = require("chokidar");

const watcher = chokidar.watch("./src", {
  ignored: /(^|[\/\\])\../, // 忽略隐藏文件
  persistent: true,
  ignoreInitial: false,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100,
  },
});

watcher
  .on("add", (path) => console.log(`文件添加: ${path}`))
  .on("change", (path) => console.log(`文件修改: ${path}`))
  .on("unlink", (path) => console.log(`文件删除: ${path}`))
  .on("addDir", (path) => console.log(`目录添加: ${path}`))
  .on("unlinkDir", (path) => console.log(`目录删除: ${path}`))
  .on("error", (error) => console.error(`错误: ${error}`))
  .on("ready", () => console.log("初始扫描完成"));

// 关闭监控
watcher.close();
```

---

### 43. 在 Node.js 中如何使用 worker_threads 模块？

**主线程：**

```javascript
const { Worker, isMainThread, workerData } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: { num: 10000000 },
  });

  worker.on("message", (result) => {
    console.log("计算结果:", result);
  });

  worker.on("error", (err) => {
    console.error("工作线程错误:", err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`工作线程退出码: ${code}`);
    }
  });
} else {
  // 工作线程代码
  const { workerData, parentPort } = require("worker_threads");

  // 执行 CPU 密集型任务
  let result = 0;
  for (let i = 0; i < workerData.num; i++) {
    result += i;
  }

  parentPort.postMessage(result);
}
```

**分离工作线程文件：**

```javascript
// main.js
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js", {
  workerData: { data: [1, 2, 3, 4, 5] },
});

worker.on("message", console.log);

// worker.js
const { parentPort, workerData } = require("worker_threads");

const result = workerData.data.reduce((a, b) => a + b, 0);
parentPort.postMessage(result);
```

**线程池实现：**

```javascript
const { Worker } = require("worker_threads");
const os = require("os");

class ThreadPool {
  constructor(size = os.cpus().length) {
    this.pool = [];
    this.queue = [];

    for (let i = 0; i < size; i++) {
      this.pool.push(this.createWorker());
    }
  }

  createWorker() {
    const worker = new Worker("./worker.js");
    worker.busy = false;

    worker.on("message", (result) => {
      worker.busy = false;
      worker.resolve(result);
      this.processQueue();
    });

    return worker;
  }

  run(data) {
    return new Promise((resolve) => {
      const availableWorker = this.pool.find((w) => !w.busy);

      if (availableWorker) {
        availableWorker.busy = true;
        availableWorker.resolve = resolve;
        availableWorker.postMessage(data);
      } else {
        this.queue.push({ data, resolve });
      }
    });
  }

  processQueue() {
    if (this.queue.length > 0) {
      const availableWorker = this.pool.find((w) => !w.busy);
      if (availableWorker) {
        const { data, resolve } = this.queue.shift();
        availableWorker.busy = true;
        availableWorker.resolve = resolve;
        availableWorker.postMessage(data);
      }
    }
  }
}
```

---

### 44. 在 Node.js 中，如何实现应用程序的国际化 (i18n)？

**使用 i18next：**

```javascript
const i18next = require("i18next");
const express = require("express");
const middleware = require("i18next-http-middleware");

// 配置 i18next
i18next.use(middleware.LanguageDetector).init({
  preload: ["en", "zh"],
  resources: {
    en: {
      translation: {
        welcome: "Welcome",
        greeting: "Hello, {{name}}!",
      },
    },
    zh: {
      translation: {
        welcome: "欢迎",
        greeting: "你好, {{name}}!",
      },
    },
  },
});

const app = express();
app.use(middleware.handle(i18next));

app.get("/", (req, res) => {
  const t = req.t;
  res.send(t("greeting", { name: "张三" }));
});

app.get("/change/:lang", (req, res) => {
  res.cookie("i18next", req.params.lang);
  res.redirect("back");
});
```

**使用 node-polyglot：**

```javascript
const Polyglot = require("node-polyglot");

const messages = {
  en: { hello: "Hello" },
  zh: { hello: "你好" },
};

function getPolyglot(locale) {
  return new Polyglot({
    locale,
    phrases: messages[locale] || messages.en,
  });
}

app.use((req, res, next) => {
  const locale = req.acceptsLanguages(["en", "zh"]) || "en";
  req.polyglot = getPolyglot(locale);
  next();
});

app.get("/", (req, res) => {
  res.send(req.polyglot.t("hello"));
});
```

---

### 45. 如何在 Node.js 中处理和解析二进制数据？

**使用 Buffer：**

```javascript
// 创建 Buffer
const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
console.log(buf.toString()); // Hello

// 读取二进制数据
const data = Buffer.from([0x01, 0x02, 0x03, 0x04]);
console.log(data.readInt8(0)); // 1
console.log(data.readInt16BE(0)); // 258
console.log(data.readUInt32LE(0)); // 67305985

// 写入二进制数据
const buf2 = Buffer.alloc(8);
buf2.writeInt32BE(12345, 0);
buf2.writeFloatBE(3.14, 4);

// 位操作
const flags = Buffer.from([0b10101010]);
console.log((flags[0] & 0b00000001) !== 0); // 检查第0位
console.log((flags[0] >> 3) & 1); // 获取第3位
```

**解析二进制协议：**

```javascript
// 解析自定义二进制格式
function parsePacket(buffer) {
  return {
    magic: buffer.readUInt32LE(0),
    version: buffer.readUInt8(4),
    type: buffer.readUInt8(5),
    length: buffer.readUInt16LE(6),
    payload: buffer.slice(8),
  };
}

// 构建二进制数据包
function buildPacket(type, payload) {
  const header = Buffer.alloc(8);
  header.writeUInt32LE(0x12345678, 0); // magic
  header.writeUInt8(1, 4); // version
  header.writeUInt8(type, 5); // type
  header.writeUInt16LE(payload.length, 6);

  return Buffer.concat([header, payload]);
}
```

**处理二进制流：**

```javascript
const { Transform } = require("stream");

class BinaryParser extends Transform {
  constructor() {
    super({ readableObjectMode: true });
    this.buffer = Buffer.alloc(0);
  }

  _transform(chunk, encoding, callback) {
    this.buffer = Buffer.concat([this.buffer, chunk]);

    while (this.buffer.length >= 8) {
      const packet = this.buffer.slice(0, 8);
      this.buffer = this.buffer.slice(8);
      this.push(parsePacket(packet));
    }

    callback();
  }
}
```

---

### 46. 什么是模板引擎？如何在 Node.js 中使用模板引擎？

**定义：**
模板引擎是将模板和数据结合生成 HTML 的工具，支持变量插值、条件判断、循环等功能。

**常用模板引擎：**

| 引擎       | 特点                  |
| ---------- | --------------------- |
| EJS        | 简单、类似 JSP        |
| Pug (Jade) | 缩进语法、简洁        |
| Handlebars | 逻辑分离、安全        |
| Nunjucks   | 功能强大、类似 Jinja2 |
| Mustache   | 轻量、跨语言          |

**EJS 示例：**

```javascript
const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    title: "首页",
    users: [
      { name: "张三", age: 25 },
      { name: "李四", age: 30 },
    ],
  });
});

// views/index.ejs
/*
<!DOCTYPE html>
<html>
<head><title><%= title %></title></head>
<body>
  <ul>
    <% users.forEach(user => { %>
      <li><%= user.name %> - <%= user.age %>岁</li>
    <% }); %>
  </ul>
</body>
</html>
*/
```

**Pug 示例：**

```javascript
app.set("view engine", "pug");

// views/index.pug
/*
doctype html
html
  head
    title= title
  body
    ul
      each user in users
        li= user.name + ' - ' + user.age + '岁'
*/
```

**Handlebars 示例：**

```javascript
const exphbs = require("express-handlebars");
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// views/index.hbs
/*
<ul>
  {{#each users}}
    <li>{{name}} - {{age}}岁</li>
  {{/each}}
</ul>
*/
```

---

### 47. 如何在 Node.js 中使用 Redis 实现数据缓存？

**基础使用：**

```javascript
const Redis = require("ioredis");
const redis = new Redis({
  host: "localhost",
  port: 6379,
  password: "password",
  db: 0,
});

// 字符串操作
await redis.set("key", "value");
await redis.set("key", "value", "EX", 3600); // 设置过期时间
const value = await redis.get("key");
await redis.del("key");

// 哈希操作
await redis.hset("user:1", "name", "张三", "age", 25);
const user = await redis.hgetall("user:1");

// 列表操作
await redis.lpush("list", "a", "b", "c");
const items = await redis.lrange("list", 0, -1);

// 集合操作
await redis.sadd("set", "a", "b", "c");
const members = await redis.smembers("set");

// 有序集合
await redis.zadd("scores", 100, "player1", 200, "player2");
const top = await redis.zrange("scores", 0, -1, "WITHSCORES");
```

**缓存模式：**

```javascript
// Cache-Aside 模式
async function getUser(id) {
  const cached = await redis.get(`user:${id}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const user = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  await redis.set(`user:${id}`, JSON.stringify(user), "EX", 3600);
  return user;
}

// 缓存装饰器
function cache(ttl = 3600) {
  return function (target, propertyKey, descriptor) {
    const original = descriptor.value;
    descriptor.value = async function (...args) {
      const key = `${propertyKey}:${JSON.stringify(args)}`;
      const cached = await redis.get(key);
      if (cached) return JSON.parse(cached);

      const result = await original.apply(this, args);
      await redis.set(key, JSON.stringify(result), "EX", ttl);
      return result;
    };
  };
}
```

**发布订阅：**

```javascript
// 发布者
await redis.publish("channel", "message");

// 订阅者
const subscriber = new Redis();
subscriber.subscribe("channel");
subscriber.on("message", (channel, message) => {
  console.log(`收到消息: ${message}`);
});
```

---

### 48. 在 Node.js 中，如何使用 JWT 进行用户认证？

**生成和验证 JWT：**

```javascript
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your-secret-key";

// 生成 Token
function generateToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
}

// 验证 Token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

// 刷新 Token
function refreshToken(token) {
  const decoded = verifyToken(token);
  if (!decoded) return null;
  return generateToken({ id: decoded.id, username: decoded.username });
}
```

**Express 中间件：**

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// 认证中间件
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "未提供认证令牌" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: "无效的令牌" });
  }

  req.user = decoded;
  next();
}

// 使用中间件
app.post("/login", (req, res) => {
  const user = authenticate(req.body.username, req.body.password);
  if (user) {
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: "认证失败" });
  }
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "受保护的路由", user: req.user });
});
```

---

### 49. 如何在 Node.js 中实现日志记录，并配置不同级别的日志？

**使用 winston：**

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// 日志级别
logger.error("错误信息");
logger.warn("警告信息");
logger.info("普通信息");
logger.http("HTTP 请求");
logger.verbose("详细日志");
logger.debug("调试信息");
logger.silly("最详细日志");
```

**使用 pino（高性能）：**

```javascript
const pino = require("pino");

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

logger.info("服务器启动");
logger.error({ err: new Error("错误") }, "发生错误");
```

**Morgan（HTTP 请求日志）：**

```javascript
const morgan = require("morgan");

app.use(morgan("combined"));
app.use(morgan("dev"));
app.use(morgan(":method :url :status :response-time ms"));
```

---

### 50. 如何在 Node.js 中实现请求的限流？

**使用 express-rate-limit：**

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 100, // 每个 IP 最多 100 次请求
  message: "请求过于频繁，请稍后再试",
  headers: true,
});

app.use(limiter);

// 针对特定路由
app.use(
  "/api",
  rateLimit({
    windowMs: 60 * 1000,
    max: 10,
  }),
);
```

**自定义限流实现：**

```javascript
function rateLimiter(options = {}) {
  const { windowMs = 60000, max = 100 } = options;
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    if (!requests.has(ip)) {
      requests.set(ip, { count: 1, startTime: now });
    } else {
      const data = requests.get(ip);
      if (now - data.startTime > windowMs) {
        data.count = 1;
        data.startTime = now;
      } else {
        data.count++;
        if (data.count > max) {
          return res.status(429).json({ error: "请求过于频繁" });
        }
      }
    }
    next();
  };
}
```

---

### 51. Node.js 中的 process.nextTick() 和 setImmediate() 有什么区别？

| 特性     | process.nextTick()     | setImmediate()              |
| -------- | ---------------------- | --------------------------- |
| 执行时机 | 事件循环当前阶段结束后 | 下一个事件循环的 check 阶段 |
| 优先级   | 最高                   | 较低                        |
| 队列     | nextTick 队列          | check 队列                  |
| 阻塞风险 | 可能阻塞事件循环       | 不会阻塞                    |

**执行顺序：**

```javascript
setImmediate(() => console.log("setImmediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("Promise"));

// 输出顺序: nextTick -> Promise -> setImmediate
```

**使用场景：**

```javascript
// process.nextTick - 需要在事件循环继续之前执行
function readConfig(callback) {
  const config = loadConfig();
  process.nextTick(() => callback(config));
}

// setImmediate - 需要在 I/O 事件之后执行
const fs = require("fs");
fs.readFile("file.txt", () => {
  setImmediate(() => console.log("I/O 之后执行"));
  process.nextTick(() => console.log("I/O 回调之后立即执行"));
});
```

---

### 52. 什么是 Node.js 中的事件循环？

**定义：**
事件循环是 Node.js 处理异步操作的核心机制，它负责调度和执行各种回调函数。

**六个阶段：**

1. **timers**：执行 setTimeout/setInterval 回调
2. **pending callbacks**：执行延迟到下一轮循环的 I/O 回调
3. **idle, prepare**：内部使用
4. **poll**：轮询，执行 I/O 回调
5. **check**：执行 setImmediate 回调
6. **close callbacks**：执行 close 事件回调

**微任务：**

- process.nextTick 队列（优先级最高）
- Promise 队列

每个阶段结束后执行微任务队列。

---

### 53. Node.js 中的 Streams 有哪几种类型？

**四种类型：**

| 类型      | 说明               | 示例                 |
| --------- | ------------------ | -------------------- |
| Readable  | 可读流             | fs.createReadStream  |
| Writable  | 可写流             | fs.createWriteStream |
| Duplex    | 双工流（可读可写） | net.Socket           |
| Transform | 转换流             | zlib.createGzip      |

**Readable 流：**

```javascript
const readable = fs.createReadStream("file.txt");
readable.on("data", (chunk) => console.log(chunk));
readable.on("end", () => console.log("读取完成"));
```

**Writable 流：**

```javascript
const writable = fs.createWriteStream("output.txt");
writable.write("Hello");
writable.end();
writable.on("finish", () => console.log("写入完成"));
```

**Transform 流：**

```javascript
const { Transform } = require("stream");
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```

---

### 54. 如何在 Node.js 中实现模块的懒加载？

**方式一：动态 require**

```javascript
let heavyModule = null;

function getHeavyModule() {
  if (!heavyModule) {
    heavyModule = require("./heavyModule");
  }
  return heavyModule;
}
```

**方式二：ES Modules 动态导入**

```javascript
async function useModule() {
  const { default: module } = await import("./heavyModule.mjs");
  return module.doSomething();
}
```

**方式三：Proxy 实现**

```javascript
function lazyRequire(modulePath) {
  let module = null;
  return new Proxy(
    {},
    {
      get(target, prop) {
        if (!module) {
          module = require(modulePath);
        }
        return module[prop];
      },
    },
  );
}

const heavyModule = lazyRequire("./heavyModule");
```

---

### 55. 什么是 Node.js 中的域模块？它有什么作用？

**定义：**
domain 模块用于将多个 I/O 操作组合成一个组，统一处理错误和异常。

**注意：** 该模块已废弃，不推荐在新项目中使用。

**使用示例：**

```javascript
const domain = require("domain");
const d = domain.create();

d.on("error", (err) => {
  console.error("捕获到错误:", err.message);
});

d.run(() => {
  setTimeout(() => {
    throw new Error("异步错误");
  }, 1000);
});
```

**替代方案：**

```javascript
// 使用 process.on('uncaughtException')
process.on("uncaughtException", (err) => {
  console.error("未捕获异常:", err);
});

// 使用 async/await + try-catch
async function safeExecute() {
  try {
    await riskyOperation();
  } catch (err) {
    console.error("错误:", err);
  }
}
```

---

### 56. Node.js 中如何实现自定义的事件发射器？

**使用 EventEmitter：**

```javascript
const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }

  doSomething(data) {
    this.emit("action", data);
  }
}

const emitter = new MyEmitter();

emitter.on("action", (data) => {
  console.log("收到事件:", data);
});

emitter.once("once", () => {
  console.log("只执行一次");
});

emitter.doSomething("Hello");
emitter.emit("once");
```

**自定义事件类：**

```javascript
class TaskManager extends EventEmitter {
  constructor() {
    super();
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
    this.emit("taskAdded", task);
  }

  completeTask(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = true;
      this.emit("taskCompleted", task);
    }
  }
}

const manager = new TaskManager();
manager.on("taskAdded", (task) => console.log("任务添加:", task));
manager.on("taskCompleted", (task) => console.log("任务完成:", task));
```

---

### 57. 如何在 Node.js 中进行单元测试和集成测试？

**单元测试（Jest）：**

```javascript
// math.js
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
module.exports = { add, subtract };

// math.test.js
const { add, subtract } = require("./math");

describe("数学运算", () => {
  test("加法", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("减法", () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
```

**集成测试：**

```javascript
const request = require("supertest");
const app = require("./app");

describe("API 集成测试", () => {
  test("GET /users", async () => {
    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /users", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "张三", email: "zhang@example.com" });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe("张三");
  });
});
```

---

### 58. 如何在 Node.js 中使用 Gulp 或 Grunt 进行任务自动化？

**Gulp 示例：**

```javascript
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

// 压缩 JS
gulp.task("scripts", () => {
  return gulp
    .src("src/js/*.js")
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// 编译 Sass
gulp.task("styles", () => {
  return gulp
    .src("src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("dist/css"));
});

// 监听文件变化
gulp.task("watch", () => {
  gulp.watch("src/js/*.js", gulp.series("scripts"));
  gulp.watch("src/scss/*.scss", gulp.series("styles"));
});

gulp.task("default", gulp.series("scripts", "styles", "watch"));
```

**Grunt 示例：**

```javascript
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      options: { banner: "/*! <%= pkg.name %> */\n" },
      build: { src: "src/js/*.js", dest: "dist/js/bundle.min.js" },
    },
    sass: {
      dist: { files: { "dist/css/style.css": "src/scss/style.scss" } },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.registerTask("default", ["uglify", "sass"]);
};
```

---

### 59. 什么是 Node.js 中的事件发射器和事件监听器？

**事件发射器（EventEmitter）：**
用于创建和管理自定义事件的对象。

**事件监听器：**
绑定到事件上的回调函数，当事件触发时执行。

**使用示例：**

```javascript
const EventEmitter = require("events");
const emitter = new EventEmitter();

// 添加监听器
emitter.on("message", (data) => {
  console.log("收到消息:", data);
});

// 添加一次性监听器
emitter.once("connect", () => {
  console.log("已连接");
});

// 触发事件
emitter.emit("message", "Hello");
emitter.emit("connect");

// 移除监听器
const listener = () => console.log("监听器");
emitter.on("event", listener);
emitter.removeListener("event", listener);

// 获取监听器数量
emitter.listenerCount("message");
```

---

### 60. 在 Node.js 中，如何实现跨域资源共享？

**使用 cors 中间件：**

```javascript
const cors = require("cors");

// 允许所有来源
app.use(cors());

// 配置选项
app.use(
  cors({
    origin: ["https://example.com", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400,
  }),
);

// 动态配置
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["https://example.com"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("不允许的来源"));
      }
    },
  }),
);
```

**手动实现：**

```javascript
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

---

### 61. 如何在 Node.js 中使用消息队列实现异步处理？

**使用 RabbitMQ（amqplib）：**

```javascript
const amqp = require("amqplib");

// 生产者
async function sendToQueue(message) {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "task_queue";

  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });

  console.log("消息已发送:", message);
  await channel.close();
  await connection.close();
}

// 消费者
async function consumeQueue() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const queue = "task_queue";

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1);

  channel.consume(queue, async (msg) => {
    const content = JSON.parse(msg.content.toString());
    console.log("处理消息:", content);
    channel.ack(msg);
  });
}
```

**使用 Bull（基于 Redis）：**

```javascript
const Queue = require("bull");
const videoQueue = new Queue("video transcoding");

await videoQueue.add({ videoId: 123, format: "mp4" });

videoQueue.process(async (job) => {
  const { videoId, format } = job.data;
  await transcodeVideo(videoId, format);
  return { success: true };
});
```

---

### 62. 如何使用 Node.js 获取到客户端连接的真实 IP？

**Express 中获取：**

```javascript
app.set("trust proxy", true);

app.get("/", (req, res) => {
  const ip = req.ip;
  const forwardedFor = req.headers["x-forwarded-for"];
  console.log("客户端 IP:", ip);
});

function getClientIP(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return req.connection.remoteAddress || req.socket.remoteAddress;
}
```

---

### 63. Node.js 中 require 方法的文件查找策略是怎样的？

**查找顺序：**

1. **核心模块**：如 `fs`、`http`、`path` 等
2. **相对路径**：`./` 或 `../` 开头
3. **绝对路径**：`/` 开头
4. **node_modules**：从当前目录向上查找

**文件扩展名补全：**

```javascript
require("./module");
// 查找顺序:
// 1. ./module.js
// 2. ./module.json
// 3. ./module.node
// 4. ./module/index.js
```

---

### 64. 如何在 Node.js 中使用 Web Workers？

**使用 worker_threads 模块：**

```javascript
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename, {
    workerData: { numbers: [1, 2, 3, 4, 5] },
  });

  worker.on("message", (result) => console.log("计算结果:", result));
} else {
  const sum = workerData.numbers.reduce((a, b) => a + b, 0);
  parentPort.postMessage(sum);
}
```

---

### 65. 如何部署 Node.js 项目？

**方式一：PM2 部署**

```bash
npm install -g pm2
pm2 start app.js --name "my-app"
pm2 save
pm2 startup
```

**方式二：Docker 部署**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

---

### 66. Node.js 项目中可以使用哪些工具来保证代码规范？

**ESLint + Prettier + Husky：**

```javascript
// .eslintrc.js
module.exports = {
  env: { node: true, es2021: true },
  extends: 'eslint:recommended',
  rules: { 'no-unused-vars': 'error' }
};

// package.json
{
  "lint-staged": {
    "*.js": ["eslint --fix", "prettier --write"]
  }
}
```

---

### 67. 什么是 PM2？如何使用它部署 Node.js 项目？

**定义：**
PM2 是 Node.js 的进程管理器，提供进程守护、负载均衡、日志管理等功能。

**常用命令：**

```bash
pm2 start app.js        # 启动
pm2 list                # 查看所有进程
pm2 logs                # 查看日志
pm2 restart my-app      # 重启
pm2 stop my-app         # 停止
pm2 monit               # 监控面板
pm2 startup             # 开机自启
pm2 save                # 保存进程列表
```

**配置文件：**

```javascript
module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./app.js",
      instances: "max",
      exec_mode: "cluster",
    },
  ],
};
```

---

### 68. 开发 Node.js 项目时如何管理多个 Node 版本？

**使用 nvm：**

```bash
nvm install 18
nvm use 18
nvm alias default 18

# 项目特定版本
echo "18" > .nvmrc
nvm use
```

**使用 Volta：**

```bash
volta install node@18
volta pin node@16
```

---

### 69. 什么是 BFF？如何用 Node.js 实现 BFF？

**定义：**
BFF (Backend for Frontend) 是为不同前端提供专属后端服务层的架构模式。

**实现示例：**

```javascript
const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/home", async (req, res) => {
  const [user, products] = await Promise.all([
    axios.get("http://user-service/profile"),
    axios.get("http://product-service/recommendations"),
  ]);

  res.json({
    user: user.data,
    products: products.data.slice(0, 10),
  });
});
```

---

### 70. Node.js 中的 exec、execFile、spawn 和 fork 有什么区别？

| 方法     | 特点                   | 适用场景             |
| -------- | ---------------------- | -------------------- |
| exec     | 缓冲输出，shell 执行   | 简单命令，输出较少   |
| execFile | 直接执行文件，无 shell | 执行可执行文件       |
| spawn    | 流式输出，无缓冲       | 大量输出，长时间运行 |
| fork     | 创建 Node 子进程       | Node.js 进程间通信   |

```javascript
const { exec, spawn, fork } = require("child_process");

exec("ls -la", (err, stdout) => console.log(stdout));

const ls = spawn("ls", ["-la"]);
ls.stdout.on("data", (data) => console.log(data.toString()));

const child = fork("worker.js");
child.send({ data: "hello" });
```

---

### 71. Node.js 中的 Libuv 库有什么作用？

**定义：**
libuv 是跨平台的异步 I/O 库，是 Node.js 事件循环的核心实现。

**主要功能：**

- 实现事件循环
- 文件系统操作
- 网络操作（TCP、UDP、DNS）
- 线程池管理

**线程池配置：**

```javascript
process.env.UV_THREADPOOL_SIZE = 8;
```

---

### 72. 如何分析和优化 Node.js 应用程序的性能瓶颈？

**性能分析工具：**

```bash
# Node.js 内置分析器
node --prof app.js
node --prof-process isolate-*.log

# Chrome DevTools
node --inspect app.js

# clinic.js
clinic doctor -- node app.js
clinic flame -- node app.js
```

**优化策略：**

- 避免同步操作
- 使用流处理大文件
- 使用集群模式
- 缓存结果
- 使用工作线程处理 CPU 密集任务

---

### 73. 什么是 V8 引擎？它对于 Node.js 有什么作用？

**定义：**
V8 是 Google 开发的开源 JavaScript 引擎，用于 Chrome 浏览器和 Node.js。

**执行流程：**

```
JavaScript 源码 → Parser → AST → Ignition(解释器) → 字节码
                                           ↓
                                    TurboFan(编译器) → 优化机器码
```

**作用：**

- 编译执行 JavaScript 代码
- 内存管理
- 垃圾回收
- JIT 编译优化

---

### 74. 如何处理 Node.js 应用程序中的高并发请求？

**策略：**

```javascript
// 1. 异步非阻塞
const data = await fs.promises.readFile("file.txt");

// 2. 集群模式
const cluster = require("cluster");
if (cluster.isMaster) {
  require("os")
    .cpus()
    .forEach(() => cluster.fork());
}

// 3. 工作线程
const { Worker } = require("worker_threads");
const worker = new Worker("./compute.js");

// 4. 消息队列
const Queue = require("bull");
const queue = new Queue("tasks");

// 5. 限流
const rateLimit = require("express-rate-limit");
app.use(rateLimit({ windowMs: 60000, max: 100 }));
```

---

### 75. 如何编写原生的 C++ 扩展模块供 Node.js 使用？

**使用 N-API：**

```cpp
#include <napi.h>

Napi::Number Add(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  double sum = info[0].As<Napi::Number>() + info[1].As<Napi::Number>();
  return Napi::Number::New(env, sum);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("add", Napi::Function::New(env, Add));
  return exports;
}

NODE_API_MODULE(addon, Init)
```

**使用：**

```javascript
const addon = require("./build/Release/addon");
console.log(addon.add(1, 2)); // 3
```

---

### 76. 在 Node.js 中如何确保应用程序的安全？

**防止 SQL 注入：**

```javascript
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);
```

**防止 XSS：**

```javascript
const helmet = require("helmet");
app.use(helmet());

const escapeHtml = require("escape-html");
res.send(`<p>${escapeHtml(userInput)}</p>`);
```

**其他安全措施：**

- 使用 HTTPS
- 限制请求体大小
- 安全的 session 配置
- 输入验证
- 速率限制

---

### 77. Node.js 中的 Stream 模块是如何实现背压的？

**定义：**
背压是流处理中的一种机制，当下游处理速度慢于上游时，通知上游暂停发送数据。

**实现原理：**

```javascript
source.on("data", (chunk) => {
  const canContinue = dest.write(chunk);
  if (!canContinue) {
    source.pause();
  }
});

dest.on("drain", () => {
  source.resume();
});
```

**使用 pipe 自动处理：**

```javascript
fs.createReadStream("large.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("output.txt.gz"));
```

---

### 78. Node.js 中的 Async Hooks 是什么？

**定义：**
Async Hooks 是 Node.js 提供的 API，用于追踪异步资源的生命周期。

**基本使用：**

```javascript
const asyncHooks = require("async_hooks");

const hook = asyncHooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    console.log(`初始化: ${asyncId}, 类型: ${type}`);
  },
  before(asyncId) {
    console.log(`执行前: ${asyncId}`);
  },
  after(asyncId) {
    console.log(`执行后: ${asyncId}`);
  },
  destroy(asyncId) {
    console.log(`销毁: ${asyncId}`);
  },
});

hook.enable();
```

**应用场景：**

- 请求上下文追踪
- 性能监控
- 异步调用链分析

---

### 79. 如何在 Node.js 中使用 MQ 实现分布式系统？

**使用 RabbitMQ：**

```javascript
const amqp = require("amqplib");

// 发送消息
async function sendOrder(order) {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue("orders");
  channel.sendToQueue("orders", Buffer.from(JSON.stringify(order)));
}

// 接收消息
async function processOrders() {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue("orders");
  channel.consume("orders", async (msg) => {
    const order = JSON.parse(msg.content);
    await processOrder(order);
    channel.ack(msg);
  });
}
```

---

### 80. 如何在 Node.js 中进行代码热更新？

**方式一：删除 require 缓存**

```javascript
function hotRequire(modulePath) {
  delete require.cache[require.resolve(modulePath)];
  return require(modulePath);
}
```

**方式二：监听文件变化**

```javascript
fs.watch("./module.js", () => {
  delete require.cache[require.resolve("./module")];
  module = require("./module");
});
```

**方式三：使用 nodemon（开发环境）**

```bash
nodemon app.js
```

**生产环境：**

```bash
pm2 reload my-app
```

---

### 81. 如何在 Node.js 中处理高频率的实时数据流？

**使用流处理：**

```javascript
const { Transform, pipeline } = require("stream");

class DataProcessor extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(chunk, encoding, callback) {
    const processed = this.processData(chunk);
    this.push(processed);
    callback();
  }

  processData(data) {
    return JSON.parse(data.toString()).map((item) => ({
      ...item,
      timestamp: Date.now(),
    }));
  }
}

pipeline(dataSource, new DataProcessor(), destination, (err) => {
  if (err) console.error("流处理错误:", err);
});
```

**使用背压控制：**

```javascript
const { PassThrough } = require("stream");

const stream = new PassThrough({ highWaterMark: 1024 * 1024 });

source.on("data", (chunk) => {
  const canContinue = stream.write(chunk);
  if (!canContinue) {
    source.pause();
  }
});

stream.on("drain", () => source.resume());
```

**使用 Kafka：**

```javascript
const { Kafka } = require("kafkajs");

const kafka = new Kafka({ brokers: ["localhost:9092"] });
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "group1" });

await producer.connect();
await producer.send({
  topic: "data-stream",
  messages: [{ value: JSON.stringify(data) }],
});

await consumer.connect();
await consumer.subscribe({ topic: "data-stream" });
await consumer.run({
  eachMessage: async ({ message }) => {
    await processMessage(message.value.toString());
  },
});
```

---

### 82. Node.js 中的事件循环和浏览器中的事件循环有什么异同？

**相同点：**

- 都基于事件循环模型
- 都有宏任务和微任务
- 都使用 Promise 和 async/await

**不同点：**

| 特性                  | Node.js                            | 浏览器       |
| --------------------- | ---------------------------------- | ------------ |
| 实现方式              | libuv                              | 浏览器引擎   |
| 宏任务队列            | 多个阶段（timers、poll、check 等） | 单一队列     |
| 微任务执行时机        | 每个阶段结束后                     | 宏任务完成后 |
| process.nextTick      | 有（最高优先级）                   | 无           |
| requestAnimationFrame | 无                                 | 有           |

**执行顺序对比：**

```javascript
// Node.js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
// 输出: nextTick -> promise -> timeout/immediate（不确定）

// 浏览器
setTimeout(() => console.log("timeout"), 0);
Promise.resolve().then(() => console.log("promise"));
// 输出: promise -> timeout
```

---

### 83. 如何在 Node.js 中检测和处理内存泄漏问题？

**检测方法：**

**1. 使用 heapdump：**

```javascript
const heapdump = require("heapdump");

// 手动生成堆快照
heapdump.writeSnapshot("/tmp/heapdump-" + Date.now() + ".heapsnapshot");

// 定时生成
setInterval(() => {
  heapdump.writeSnapshot(`/tmp/heapdump-${Date.now()}.heapsnapshot`);
}, 60000);
```

**2. 使用 node-memwatch：**

```javascript
const memwatch = require("node-memwatch");

memwatch.on("leak", (info) => {
  console.log("内存泄漏检测:", info);
});

memwatch.on("stats", (stats) => {
  console.log("内存统计:", stats);
});
```

**3. 使用 Chrome DevTools：**

```bash
node --inspect app.js
# 打开 chrome://inspect
# Memory -> Take heap snapshot
```

**常见内存泄漏原因：**

```javascript
// 1. 全局变量
global.cache = {}; // 避免使用全局变量

// 2. 闭包
function createClosure() {
  const largeData = new Array(1000000);
  return function () {
    return largeData.length; // largeData 无法被回收
  };
}

// 3. 事件监听器未移除
emitter.on("event", handler);
// 忘记 emitter.removeListener('event', handler);

// 4. 定时器未清除
const timer = setInterval(() => {}, 1000);
// 忘记 clearInterval(timer);
```

**处理方法：**

```javascript
// 使用 WeakMap 避免内存泄漏
const cache = new WeakMap();

// 及时清理资源
process.on("SIGTERM", async () => {
  clearInterval(timer);
  emitter.removeAllListeners();
  await closeConnections();
  process.exit(0);
});
```

---

### 84. 如何在 Node.js 中处理 CPU 密集型任务，避免阻塞事件循环？

**方式一：使用 worker_threads**

```javascript
const { Worker } = require("worker_threads");

function runCPUTask(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./cpu-intensive.js", {
      workerData: data,
    });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
```

**方式二：使用 child_process**

```javascript
const { fork } = require("child_process");

function runInChildProcess(script, data) {
  const child = fork(script);

  return new Promise((resolve) => {
    child.send(data);
    child.on("message", (result) => {
      child.kill();
      resolve(result);
    });
  });
}
```

**方式三：任务分片**

```javascript
async function processLargeArray(array) {
  const CHUNK_SIZE = 1000;

  for (let i = 0; i < array.length; i += CHUNK_SIZE) {
    const chunk = array.slice(i, i + CHUNK_SIZE);
    processChunk(chunk);
    await new Promise((resolve) => setImmediate(resolve));
  }
}
```

**方式四：使用任务队列**

```javascript
const Queue = require("bull");
const cpuQueue = new Queue("cpu-tasks");

cpuQueue.process(async (job) => {
  return cpuIntensiveTask(job.data);
});

await cpuQueue.add({ data: largeData });
```

---

### 85. Node.js 异步编程模型的底层实现原理是怎样的？

**核心组件：**

1. **V8 引擎**：执行 JavaScript 代码
2. **libuv**：事件循环和异步 I/O
3. **线程池**：处理文件 I/O、DNS 等操作

**实现流程：**

```
JavaScript 代码
      ↓
发起异步调用（如 fs.readFile）
      ↓
V8 调用 Node.js C++ 绑定
      ↓
libuv 接收请求
      ↓
├── 网络 I/O → 操作系统非阻塞调用
└── 文件 I/O → 线程池处理
      ↓
操作完成后，回调加入事件队列
      ↓
事件循环执行回调
      ↓
JavaScript 回调函数执行
```

**事件循环实现：**

```javascript
// 简化的事件循环实现
function eventLoop() {
  while (true) {
    // 1. 执行 nextTick 队列
    runNextTicks();

    // 2. 执行 Promise 队列
    runPromises();

    // 3. timers 阶段
    runTimers();

    // 4. pending callbacks
    runPendingCallbacks();

    // 5. poll 阶段
    runPoll();

    // 6. check 阶段
    runCheck();

    // 7. close callbacks
    runCloseCallbacks();
  }
}
```

---

### 86. 如何在 Node.js 中实现一个高性能的 Web 服务器？

**核心优化策略：**

**1. 使用集群模式：**

```javascript
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  os.cpus().forEach(() => cluster.fork());
  cluster.on("exit", (worker) => cluster.fork());
} else {
  createServer();
}
```

**2. 使用高性能框架：**

```javascript
const fastify = require("fastify")({ logger: false });

fastify.get("/", async (req, reply) => {
  return { hello: "world" };
});

fastify.listen({ port: 3000 });
```

**3. 启用压缩：**

```javascript
const compression = require("compression");
app.use(compression());
```

**4. 使用缓存：**

```javascript
const redis = require("redis");
const client = redis.createClient();

app.get("/data", async (req, res) => {
  const cached = await client.get("data");
  if (cached) return res.json(JSON.parse(cached));

  const data = await fetchData();
  await client.setEx("data", 3600, JSON.stringify(data));
  res.json(data);
});
```

**5. 连接池：**

```javascript
const { Pool } = require("pg");
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
});

const client = await pool.connect();
```

**6. 流式响应：**

```javascript
app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  const stream = fs.createReadStream("large.json");
  stream.pipe(res);
});
```

---

### 87. Node.js 是基于单线程实现的么？为什么？

**答案：是，但不完全是**

**单线程部分：**

- JavaScript 代码执行（V8 主线程）
- 事件循环
- 回调函数执行

**多线程部分：**

- libuv 线程池（默认 4 线程）
- 工作线程（worker_threads）
- 子进程

**原因：**

1. **历史原因**：JavaScript 设计为单线程语言
2. **简化编程**：避免锁、竞态条件等问题
3. **高效 I/O**：非阻塞 I/O 模型适合单线程

**验证：**

```javascript
// 主线程 ID 始终为 0
console.log(process.pid); // 进程 ID

// 线程池大小
console.log(process.env.UV_THREADPOOL_SIZE || 4);

// 查看线程
const { isMainThread } = require("worker_threads");
console.log(isMainThread); // true
```

---

### 88. 请介绍 Node.js 中的事件驱动架构，它与传统线程模型有什么区别？

**事件驱动架构：**

```
请求 → 事件队列 → 事件循环 → 回调执行 → 响应
```

**对比传统线程模型：**

| 特性       | 事件驱动 | 线程模型                  |
| ---------- | -------- | ------------------------- |
| 线程数量   | 单线程   | 多线程                    |
| 内存消耗   | 低       | 高（每线程约 1MB 栈空间） |
| 上下文切换 | 无       | 有                        |
| 并发处理   | 异步回调 | 阻塞等待                  |
| CPU 密集型 | 不适合   | 适合                      |
| I/O 密集型 | 非常适合 | 一般                      |

**事件驱动示例：**

```javascript
const server = http.createServer((req, res) => {
  // 非阻塞 I/O
  fs.readFile("data.json", (err, data) => {
    res.end(data);
  });
});

server.listen(3000);
```

**传统线程模型（伪代码）：**

```java
// Java 示例
ServerSocket server = new ServerSocket(3000);
while (true) {
  Socket socket = server.accept();
  new Thread(() -> {
    // 阻塞 I/O
    String data = readFile("data.json");
    socket.write(data);
  }).start();
}
```

---

### 89. 如何在 Node.js 中使用 TLS/SSL 来建立安全的网络连接？

**创建 HTTPS 服务器：**

```javascript
const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("private-key.pem"),
  cert: fs.readFileSync("certificate.pem"),
  ca: fs.readFileSync("ca-cert.pem"),
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end("Hello HTTPS");
});

server.listen(443);
```

**使用 TLS Socket：**

```javascript
const tls = require("tls");

const options = {
  host: "example.com",
  port: 443,
  rejectUnauthorized: true,
};

const socket = tls.connect(options, () => {
  console.log("TLS 连接已建立");
  socket.write("GET / HTTP/1.1\r\nHost: example.com\r\n\r\n");
});

socket.on("data", (data) => {
  console.log(data.toString());
});
```

**生成自签名证书：**

```bash
openssl genrsa -out private-key.pem 2048
openssl req -new -key private-key.pem -out csr.pem
openssl x509 -req -in csr.pem -signkey private-key.pem -out certificate.pem -days 365
```

---

### 90. 如何在 Node.js 中编写高性能的网络应用，需考虑哪些因素？

**关键因素：**

**1. 连接管理：**

```javascript
const server = http.createServer();
server.maxConnections = 1000;
server.on("connection", (socket) => {
  socket.setTimeout(30000);
  socket.setNoDelay(true);
  socket.setKeepAlive(true, 60000);
});
```

**2. 缓冲区优化：**

```javascript
const socket = new net.Socket();
socket.setBufferSize(64 * 1024);
```

**3. 背压处理：**

```javascript
socket.on("data", (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    socket.pause();
  }
});

writable.on("drain", () => {
  socket.resume();
});
```

**4. 连接复用：**

```javascript
const http = require("http");
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 50,
  maxFreeSockets: 10,
});

const req = http.request({
  host: "api.example.com",
  agent: agent,
});
```

**5. 负载均衡：**

```javascript
const cluster = require("cluster");
if (cluster.isMaster) {
  const workers = require("os").cpus().length;
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }
}
```

---

### 91. Node.js 中的事件循环是如何与操作系统的线程池进行交互的？

**交互流程：**

```
JavaScript 调用
      ↓
Node.js C++ 绑定
      ↓
libuv 事件循环
      ↓
┌─────────────────────────────────┐
│  操作类型判断                    │
├─────────────────────────────────┤
│ 网络 I/O → epoll/kqueue/IOCP   │
│ 文件 I/O → 线程池              │
│ DNS 查询 → 线程池              │
│ 加密操作 → 线程池              │
└─────────────────────────────────┘
      ↓
完成后回调加入队列
      ↓
事件循环执行回调
```

**线程池操作：**

```javascript
// 这些操作使用线程池
const crypto = require("crypto");
const fs = require("fs");
const dns = require("dns");

// 文件操作
fs.readFile("file.txt", callback);

// 加密操作
crypto.pbkdf2("password", "salt", 100000, 64, "sha512", callback);

// DNS 查询
dns.lookup("example.com", callback);
```

**配置线程池大小：**

```javascript
// 启动时设置
process.env.UV_THREADPOOL_SIZE = 8;
```

---

### 92. Node.js 中如何处理大文件的读取和写入，避免阻塞主线程？

**使用流处理：**

```javascript
const fs = require("fs");
const { pipeline } = require("stream");

// 读取大文件
const readStream = fs.createReadStream("large-file.txt", {
  highWaterMark: 64 * 1024, // 64KB 缓冲区
});

// 写入大文件
const writeStream = fs.createWriteStream("output.txt");

// 使用 pipeline 自动处理背压
pipeline(readStream, writeStream, (err) => {
  if (err) console.error("处理失败:", err);
  else console.log("处理完成");
});
```

**逐行处理：**

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("large-file.txt"),
});

rl.on("line", (line) => {
  processLine(line);
});

rl.on("close", () => {
  console.log("文件处理完成");
});
```

**分块处理：**

```javascript
async function processLargeFile(filePath, chunkSize = 1024 * 1024) {
  const fd = await fs.promises.open(filePath, "r");
  const buffer = Buffer.alloc(chunkSize);

  let position = 0;
  while (true) {
    const { bytesRead } = await fd.read(buffer, 0, chunkSize, position);
    if (bytesRead === 0) break;

    await processChunk(buffer.slice(0, bytesRead));
    position += bytesRead;

    // 让出事件循环
    await new Promise((resolve) => setImmediate(resolve));
  }

  await fd.close();
}
```

---

### 93. 如何在 Node.js 中进行高效的日志处理，避免影响性能？

**异步日志：**

```javascript
const pino = require("pino");

const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
  },
});

// 异步写入
logger.info("操作完成");
```

**日志分级：**

```javascript
const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
```

**日志缓冲：**

```javascript
class BufferedLogger {
  constructor(flushInterval = 5000, bufferSize = 1000) {
    this.buffer = [];
    this.flushInterval = flushInterval;
    this.bufferSize = bufferSize;

    setInterval(() => this.flush(), flushInterval);
  }

  log(message) {
    this.buffer.push({ message, timestamp: Date.now() });
    if (this.buffer.length >= this.bufferSize) {
      this.flush();
    }
  }

  async flush() {
    if (this.buffer.length === 0) return;

    const logs = this.buffer.splice(0);
    await fs.promises.appendFile(
      "app.log",
      logs.map((l) => JSON.stringify(l)).join("\n"),
    );
  }
}
```

---

### 94. 如何在 Node.js 中实现微服务架构？

**服务拆分：**

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  API 网关   │────→│  用户服务   │     │  订单服务   │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       └───────────────────┴───────────────────┘
                           │
                    ┌──────┴──────┐
                    │  消息队列   │
                    └─────────────┘
```

**服务通信：**

```javascript
// HTTP 通信
const axios = require("axios");

async function getUser(userId) {
  const { data } = await axios.get(`http://user-service/users/${userId}`);
  return data;
}

// 消息队列通信
const amqp = require("amqplib");

async function publishOrder(order) {
  const conn = await amqp.connect("amqp://localhost");
  const channel = await conn.createChannel();
  await channel.assertQueue("orders");
  channel.sendToQueue("orders", Buffer.from(JSON.stringify(order)));
}
```

**服务发现：**

```javascript
const Consul = require("consul");
const consul = new Consul();

// 注册服务
await consul.agent.service.register({
  name: "user-service",
  address: "192.168.1.100",
  port: 3000,
});

// 发现服务
const services = await consul.catalog.service.nodes("user-service");
```

---

### 95. 什么是 Node.js 的内存管理机制？如何避免内存泄漏和溢出？

**内存结构：**

```
┌─────────────────────────────────────┐
│            V8 堆内存                 │
├─────────────┬───────────────────────┤
│  新生代     │       老生代           │
│  (Scavenge) │  (Mark-Sweep-Compact) │
│   ~32MB     │        ~1.4GB         │
└─────────────┴───────────────────────┘
```

**内存限制：**

```javascript
// 64位系统默认约 1.4GB
// 32位系统默认约 0.7GB

// 调整内存限制
node --max-old-space-size=4096 app.js
```

**避免内存泄漏：**

```javascript
// 1. 及时清理引用
let cache = new Map();
function cleanup() {
  cache.clear();
  cache = null;
}

// 2. 使用 WeakMap
const weakCache = new WeakMap();

// 3. 移除事件监听器
emitter.on("event", handler);
emitter.off("event", handler);

// 4. 清除定时器
const timer = setInterval(() => {}, 1000);
clearInterval(timer);
```

**监控内存：**

```javascript
setInterval(() => {
  const used = process.memoryUsage();
  console.log({
    rss: `${Math.round(used.rss / 1024 / 1024)}MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)}MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)}MB`,
  });
}, 60000);
```

---

### 96. 什么是 Node.js 的垃圾回收机制？如何手动触发垃圾回收？

**垃圾回收算法：**

**1. 新生代 - Scavenge：**

- 将堆分为两半
- 存活对象复制到另一半
- 速度快，适合短生命周期对象

**2. 老生代 - Mark-Sweep-Compact：**

- 标记存活对象
- 清除未标记对象
- 整理内存碎片

**手动触发 GC：**

```bash
# 启动时开启手动 GC
node --expose-gc app.js
```

```javascript
// 手动触发垃圾回收
if (global.gc) {
  global.gc();
  console.log("垃圾回收已触发");
}

// 查看内存状态
const used = process.memoryUsage();
console.log("堆使用:", used.heapUsed);

// 触发后查看
global.gc();
console.log("GC后堆使用:", process.memoryUsage().heapUsed);
```

**GC 日志：**

```bash
# 查看 GC 日志
node --trace-gc app.js

# 详细 GC 日志
node --trace-gc-verbose app.js
```

**优化建议：**

- 避免创建过多临时对象
- 复用对象和缓冲区
- 及时释放大对象引用
- 合理设置 --max-old-space-size
