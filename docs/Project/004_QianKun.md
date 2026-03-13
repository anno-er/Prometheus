# 微前端 Qiankun 知识点与面试题

## 一、微前端概述

### 1.1 什么是微前端

微前端是一种将前端应用分解成更小、更简单的独立片段的架构模式，每个片段可以独立开发、测试和部署。它借鉴了微服务的思想，将单体前端应用拆分为多个可独立运行的子应用。

### 1.2 微前端的核心价值

| 价值           | 说明                                                 |
| -------------- | ---------------------------------------------------- |
| **技术栈无关** | 主框架不限制接入应用的技术栈，子应用可自主选择技术栈 |
| **独立开发**   | 各个团队可以独立开发、测试、部署自己的应用           |
| **独立部署**   | 每个子应用可以独立部署，不影响其他应用               |
| **增量升级**   | 可以逐步迁移旧系统，无需一次性重写                   |
| **团队自治**   | 不同团队可以独立维护自己的子应用                     |

### 1.3 微前端实现方案对比

| 方案                  | 优点                              | 缺点                         | 适用场景           |
| --------------------- | --------------------------------- | ---------------------------- | ------------------ |
| **iframe**            | 天然隔离、实现简单                | 性能差、SEO不友好、URL不同步 | 简单集成第三方系统 |
| **Web Components**    | 标准化、原生支持                  | 兼容性问题、生态不成熟       | 组件级别隔离       |
| **single-spa**        | 成熟稳定、生态丰富                | 配置复杂、需要自行处理隔离   | 需要精细控制的场景 |
| **qiankun**           | 开箱即用、完善隔离                | 学习成本、调试复杂           | 中大型企业应用     |
| **Module Federation** | Webpack5原生支持、共享依赖        | 依赖Webpack5、配置复杂       | Webpack5项目       |
| **EMP**               | 基于Module Federation、支持跨框架 | 社区较小、文档较少           | 跨团队协作项目     |
| **MicroApp**          | 基于Web Components、使用简单      | 兼容性依赖Custom Elements    | 快速接入微前端     |

---

## 二、Qiankun 简介

### 2.1 什么是 Qiankun

Qiankun（乾坤）是蚂蚁金服开源的基于 single-spa 的微前端实现库，旨在帮助开发者能更简单、无痛地构建一个生产可用的微前端架构系统。

### 2.2 Qiankun 的核心特性

```
┌─────────────────────────────────────────────────────────────┐
│                      Qiankun 核心特性                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 📦 基于     │  │ 🔧 开箱即用 │  │ 🛡️ 样式隔离 │         │
│  │ single-spa  │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ 🔐 JS沙箱   │  │ 📡 资源预加载│  │ 📱 子应用   │         │
│  │             │  │             │  │ 通信机制    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

| 特性                | 说明                                |
| ------------------- | ----------------------------------- |
| **基于 single-spa** | 封装了 single-spa，提供更高级的 API |
| **样式隔离**        | 支持严格样式隔离和 scoped CSS       |
| **JS 沙箱**         | 通过 Proxy 实现JavaScript隔离       |
| **资源预加载**      | 支持子应用资源预加载，提升用户体验  |
| **子应用通信**      | 提供完善的子应用间通信机制          |

### 2.3 Qiankun 与 single-spa 的关系

```
single-spa (基础层)
    │
    ├── 提供生命周期管理
    ├── 提供路由劫持
    └── 提供应用加载机制
            │
            ▼
qiankun (增强层)
    │
    ├── 增加样式隔离
    ├── 增加 JS 沙箱
    ├── 增加资源预加载
    ├── 增加子应用通信
    └── 简化配置和使用
```

---

## 三、Qiankun 核心原理

### 3.1 整体架构

```
┌────────────────────────────────────────────────────────────────┐
│                         主应用 (Main App)                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    qiankun 容器                           │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │  │
│  │  │ 路由监听    │  │ 应用管理    │  │ 沙箱管理    │      │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                 │
│              ┌───────────────┼───────────────┐                │
│              ▼               ▼               ▼                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │  子应用 A     │  │  子应用 B     │  │  子应用 C     │        │
│  │  (React)     │  │  (Vue)       │  │  (Angular)   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 应用加载流程

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ 路由匹配 │───▶│ 加载资源 │───▶│ 创建沙箱 │───▶│ 挂载应用 │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │
     ▼              ▼              ▼              ▼
 监听URL变化   fetch获取HTML   创建JS沙箱     执行mount
               解析HTML/CSS    创建CSS沙箱    渲染子应用
               加载JS脚本
```

### 3.3 HTML Entry 原理

Qiankun 使用 HTML Entry 的方式加载子应用，而不是直接加载 JS 文件：

```javascript
// HTML Entry 加载流程
const loadApp = async (app) => {
  // 1. fetch 获取 HTML 内容
  const html = await fetch(app.entry).then((res) => res.text());

  // 2. 解析 HTML，提取 script 和 style 标签
  const { scripts, styles, template } = parseHtml(html);

  // 3. 创建容器并插入模板
  const container = document.createElement("div");
  container.innerHTML = template;

  // 4. 加载并执行脚本
  for (const script of scripts) {
    await executeScript(script);
  }

  // 5. 返回子应用的 exports
  return getSubAppExports();
};
```

### 3.4 JS 沙箱实现原理

Qiankun 提供了三种 JS 沙箱实现：

#### 3.4.1 LegacySandbox（快照沙箱）

```javascript
class LegacySandbox {
  constructor() {
    this.addedPropsMapInPatch = new Map();
    this.modifiedPropsOriginalValueMapInPatch = new Map();
    this.currentUpdatedPropsValueMap = new Map();
    this.sandboxRunning = false;
  }

  active() {
    this.sandboxRunning = true;
    // 记录当前 window 状态
  }

  inactive() {
    this.sandboxRunning = false;
    // 恢复 window 状态
  }
}
```

#### 3.4.2 ProxySandbox（代理沙箱）

```javascript
class ProxySandbox {
  constructor() {
    const fakeWindow = Object.create(null);

    this.proxy = new Proxy(fakeWindow, {
      get(target, prop) {
        // 优先从 fakeWindow 获取
        if (target.hasOwnProperty(prop)) {
          return target[prop];
        }
        // 否则从真实 window 获取
        return window[prop];
      },

      set(target, prop, value) {
        if (sandboxRunning) {
          target[prop] = value;
        }
        return true;
      },

      has(target, prop) {
        return prop in target || prop in window;
      },
    });
  }
}
```

#### 3.4.3 SnapshotSandbox（快照沙箱-兼容模式）

```javascript
class SnapshotSandbox {
  constructor() {
    this.windowSnapshot = {};
    this.modifyPropsMap = {};
  }

  active() {
    // 保存当前 window 快照
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop];
    }

    // 恢复之前的修改
    Object.keys(this.modifyPropsMap).forEach((prop) => {
      window[prop] = this.modifyPropsMap[prop];
    });
  }

  inactive() {
    // 记录修改
    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        this.modifyPropsMap[prop] = window[prop];
        // 恢复原始值
        window[prop] = this.windowSnapshot[prop];
      }
    }
  }
}
```

#### 三种沙箱对比

| 沙箱类型        | 实现方式    | 性能 | 兼容性          | 适用场景              |
| --------------- | ----------- | ---- | --------------- | --------------------- |
| LegacySandbox   | Proxy + Map | 较好 | 需要 Proxy 支持 | 单实例场景            |
| ProxySandbox    | Proxy       | 最好 | 需要 Proxy 支持 | 多实例场景            |
| SnapshotSandbox | 对象遍历    | 较差 | 最好            | 不支持 Proxy 的浏览器 |

### 3.5 样式隔离原理

#### 3.5.1 StrictStyleIsolation（严格样式隔离）

使用 Shadow DOM 实现真正的样式隔离：

```javascript
// 使用 Shadow DOM
const container = document.createElement("div");
const shadow = container.attachShadow({ mode: "open" });
shadow.innerHTML = subAppContent;
```

**优点**：真正的样式隔离，互不影响

**缺点**：

- 某些 UI 框架可能不兼容
- 弹窗、下拉框等可能样式丢失
- 不支持 IE

#### 3.5.2 Scoped CSS（作用域样式）

通过给 CSS 选择器添加前缀实现隔离：

```css
/* 原始样式 */
.container {
  color: red;
}

/* 处理后的样式 */
div[data-qiankun="app1"] .container {
  color: red;
}
```

```javascript
// 实现原理
const scopedCSS = (styleElement, appName) => {
  const prefix = `[data-qiankun="${appName}"]`;
  const css = styleElement.textContent;

  // 为每个选择器添加前缀
  const scopedCSS = css.replace(/(^|\})\s*([^{]+)\s*\{/g, (match, p1, p2) => {
    return `${p1} ${prefix} ${p2} {`;
  });

  styleElement.textContent = scopedCSS;
};
```

### 3.6 应用通信机制

#### 3.6.1 Props 通信

主应用通过 props 向子应用传递数据：

```javascript
// 主应用
registerMicroApps([
  {
    name: "app1",
    entry: "//localhost:8081",
    container: "#container",
    activeRule: "/app1",
    props: {
      data: { user: "admin" },
      onLogin: (token) => {
        /* ... */
      },
    },
  },
]);

// 子应用
export function mount(props) {
  console.log(props.data.user);
  props.onLogin("token");
}
```

#### 3.6.2 initGlobalState 通信

使用 qiankun 提供的全局状态管理：

```javascript
// 主应用
import { initGlobalState } from "qiankun";

const initialState = {
  user: "admin",
  token: "",
};

const actions = initGlobalState(initialState);

// 监听变化
actions.onGlobalStateChange((state, prevState) => {
  console.log("状态变化:", state);
});

// 设置状态
actions.setGlobalState({ token: "new-token" });

// 子应用
export function mount(props) {
  props.onGlobalStateChange((state, prevState) => {
    console.log("主应用状态变化:", state);
  });

  props.setGlobalState({ user: "guest" });
}
```

### 3.7 路由劫持原理

Qiankun 通过劫持路由来实现子应用的激活和卸载：

```javascript
// 路由劫持实现原理
const originalPushState = window.history.pushState;
const originalReplaceState = window.history.replaceState;

window.history.pushState = function (state, title, url) {
  originalPushState.call(this, state, title, url);
  // 触发路由变化事件
  dispatchEvent(new PopStateEvent("popstate", { state }));
};

window.history.replaceState = function (state, title, url) {
  originalReplaceState.call(this, state, title, url);
  dispatchEvent(new PopStateEvent("popstate", { state }));
};

// 监听路由变化
window.addEventListener("popstate", () => {
  // 检查是否需要激活/卸载子应用
  checkActiveApps();
});

// 同时监听 hash 变化
window.addEventListener("hashchange", () => {
  checkActiveApps();
});
```

---

## 四、Qiankun 实战指南

### 4.1 主应用配置

#### 4.1.1 安装依赖

```bash
npm install qiankun
```

#### 4.1.2 注册子应用

```javascript
// main.js
import { registerMicroApps, start } from "qiankun";

registerMicroApps(
  [
    {
      name: "react-app",
      entry: "//localhost:8081",
      container: "#subapp-container",
      activeRule: "/react",
      props: {
        routerBase: "/react",
      },
    },
    {
      name: "vue-app",
      entry: "//localhost:8082",
      container: "#subapp-container",
      activeRule: "/vue",
      props: {
        routerBase: "/vue",
      },
    },
  ],
  {
    beforeLoad: (app) => {
      console.log("before load", app.name);
      return Promise.resolve();
    },
    beforeMount: (app) => {
      console.log("before mount", app.name);
      return Promise.resolve();
    },
    afterMount: (app) => {
      console.log("after mount", app.name);
      return Promise.resolve();
    },
    beforeUnmount: (app) => {
      console.log("before unmount", app.name);
      return Promise.resolve();
    },
    afterUnmount: (app) => {
      console.log("after unmount", app.name);
      return Promise.resolve();
    },
  },
);

start();
```

#### 4.1.3 start 配置项

```javascript
start({
  // 是否预加载子应用
  prefetch: "all", // true | 'all' | string[] | function

  // 样式隔离方式
  sandbox: {
    strictStyleIsolation: false, // Shadow DOM
    experimentalStyleIsolation: true, // Scoped CSS
  },

  // 是否开启单实例模式
  singular: false,

  // 是否开启沙箱
  sandbox: true,

  // 自定义 fetch
  fetch: (url, ...args) => {
    console.log("fetching:", url);
    return window.fetch(url, ...args);
  },

  // 自定义 getTemplate
  getTemplate: (tpl) => {
    return tpl;
  },
});
```

### 4.2 子应用配置

#### 4.2.1 Vue 子应用

```javascript
// main.js
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

Vue.config.productionTip = false;

let router = null;
let instance = null;

function render(props = {}) {
  const { container } = props;

  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? props.routerBase : "/",
    mode: "history",
    routes: [],
  });

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出生命周期钩子
export async function bootstrap() {
  console.log("vue app bootstraped");
}

export async function mount(props) {
  console.log("vue app mount", props);
  render(props);
}

export async function unmount() {
  console.log("vue app unmount");
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
```

#### 4.2.2 React 子应用

```javascript
// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

function render(props = {}) {
  const { container } = props;

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
      ? container.querySelector("#root")
      : document.querySelector("#root"),
  );
}

// 独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 导出生命周期钩子
export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props) {
  console.log("react app mount", props);
  render(props);
}

export async function unmount(props) {
  console.log("react app unmount", props);
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container
      ? container.querySelector("#root")
      : document.querySelector("#root"),
  );
}
```

#### 4.2.3 Webpack 配置

```javascript
// vue.config.js / webpack.config.js
const { name } = require("./package.json");

module.exports = {
  output: {
    library: `${name}-[name]`,
    libraryTarget: "umd",
    jsonpFunction: `webpackJsonp_${name}`,
  },
  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
```

#### 4.2.4 Vite 配置

```javascript
// vite.config.js
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  plugins: [
    qiankun("sub-app-name", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 8081,
    cors: true,
    origin: "http://localhost:8081",
  },
});
```

### 4.3 子应用路由配置

#### 4.3.1 Vue Router 配置

```javascript
// 子应用路由
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? "/app1" : "/",
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
  ],
});

// 主应用跳转子应用
this.$router.push("/app1/about");
```

#### 4.3.2 React Router 配置

```javascript
// 子应用路由
const basename = window.__POWERED_BY_QIANKUN__ ? "/app1" : "";

<BrowserRouter basename={basename}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>;
```

### 4.4 应用间通信

#### 4.4.1 创建全局状态

```javascript
// 主应用 store/actions.js
import { initGlobalState } from "qiankun";

const initialState = {
  user: null,
  token: "",
  theme: "light",
};

const actions = initGlobalState(initialState);

export default actions;
```

#### 4.4.2 主应用使用

```javascript
// 主应用
import actions from "./store/actions";

// 设置状态
actions.setGlobalState({
  user: { name: "admin", id: 1 },
});

// 监听状态变化
actions.onGlobalStateChange((state, prev) => {
  console.log("主应用监听到状态变化:", state);
});
```

#### 4.4.3 子应用使用

```javascript
// 子应用 main.js
let globalActions = null;

export async function mount(props) {
  // 保存 actions
  globalActions = props;

  // 监听状态变化
  props.onGlobalStateChange((state, prev) => {
    console.log("子应用监听到状态变化:", state);
  });

  // 设置状态
  props.setGlobalState({ theme: "dark" });
}

export async function unmount() {
  globalActions = null;
}
```

#### 4.4.4 封装通信 Hook（Vue）

```javascript
// hooks/useGlobalState.js
import { ref, onMounted, onUnmounted } from "vue";

export function useGlobalState() {
  const state = ref({});
  let actions = null;

  const setState = (newState) => {
    actions?.setGlobalState(newState);
  };

  onMounted(() => {
    actions = window.qiankunGlobalActions;
    actions?.onGlobalStateChange((value) => {
      state.value = value;
    }, true);
  });

  return {
    state,
    setState,
  };
}
```

---

## 五、常见问题与解决方案

### 5.1 子应用静态资源 404

**问题原因**：子应用的静态资源路径是相对路径，加载时找不到正确位置。

**解决方案**：

```javascript
// 方案1：使用 publicPath
// 子应用 main.js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 方案2：Vue CLI 项目
// vue.config.js
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/sub-app/"
      : "http://localhost:8081/",
};

// 方案3：Vite 项目
// vite.config.js
export default defineConfig({
  base: window.__POWERED_BY_QIANKUN__ ? "/sub-app/" : "/",
});
```

### 5.2 子应用样式污染主应用

**解决方案**：

```javascript
// 方案1：开启样式隔离
start({
    sandbox: {
        experimentalStyleIsolation: true // Scoped CSS
        // 或
        // strictStyleIsolation: true // Shadow DOM
    }
});

// 方案2：CSS Modules
// 子应用使用 CSS Modules
import styles from './App.module.css';

// 方案3：添加命名空间
// 所有样式添加前缀
.app1-container {
    .app1-header { }
    .app1-content { }
}
```

### 5.3 子应用全局变量污染

**问题原因**：子应用修改了 window 上的属性，影响其他应用。

**解决方案**：

```javascript
// 方案1：确保沙箱开启
start({
  sandbox: true,
});

// 方案2：避免使用全局变量
// 使用模块化方式管理状态
// Vuex / Redux / Pinia

// 方案3：手动清理
export async function unmount() {
  delete window.someGlobalVariable;
}
```

### 5.4 子应用路由跳转问题

**问题原因**：子应用路由的 base 配置不正确。

**解决方案**：

```javascript
// Vue Router
const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? "/app1" : "/",
  mode: "history",
  routes,
});

// React Router
const basename = window.__POWERED_BY_QIANKUN__ ? "/app1" : "";

// 主应用跳转
// 使用 history.pushState
window.history.pushState(null, "", "/app1/page");
```

### 5.5 子应用接口请求跨域

**解决方案**：

```javascript
// 方案1：开发环境代理
// 子应用 vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://api.example.com',
                changeOrigin: true
            }
        }
    }
};

// 方案2：主应用统一代理
// nginx 配置
location /api/ {
    proxy_pass http://api.example.com/;
}

// 方案3：子应用配置 CORS
// 后端设置响应头
res.setHeader('Access-Control-Allow-Origin', '*');
```

### 5.6 子应用弹窗样式丢失

**问题原因**：使用 Shadow DOM 时，弹窗挂载到 body，不在 Shadow DOM 内。

**解决方案**：

```javascript
// 方案1：不使用 Shadow DOM
start({
    sandbox: {
        experimentalStyleIsolation: true // 使用 Scoped CSS
    }
});

// 方案2：指定弹窗挂载容器
// Element UI
<el-dialog :modal-append-to-body="false">
    <!-- 内容 -->
</el-dialog>

// Ant Design
<Modal getContainer={false}>
    {/* 内容 */}
</Modal>

// 方案3：动态加载样式
export async function mount(props) {
    // 加载弹窗样式到 body
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = '/sub-app/dialog.css';
    document.head.appendChild(style);
}
```

### 5.7 子应用 keep-alive 失效

**问题原因**：子应用卸载时实例被销毁。

**解决方案**：

```javascript
// 方案1：使用 loadMicroApp 手动控制
import { loadMicroApp } from 'qiankun';

const microApp = loadMicroApp({
    name: 'app1',
    entry: '//localhost:8081',
    container: '#container'
});

// 不需要时手动卸载
microApp.unmount();

// 方案2：主应用使用 keep-alive
// 主应用
<keep-alive>
    <router-view />
</keep-alive>

// 方案3：子应用内部使用 keep-alive
// 子应用
<keep-alive>
    <router-view />
</keep-alive>
```

### 5.8 开发环境热更新失效

**解决方案**：

```javascript
// Vue CLI 项目
// vue.config.js
module.exports = {
  devServer: {
    port: 8081,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};

// Vite 项目
// vite.config.js
export default defineConfig({
  server: {
    port: 8081,
    hmr: true,
  },
});
```

---

## 六、性能优化

### 6.1 预加载策略

```javascript
// 预加载配置
start({
  // 预加载所有子应用
  prefetch: "all",

  // 预加载指定子应用
  prefetch: ["app1", "app2"],

  // 自定义预加载策略
  prefetch: (apps) => {
    return apps.filter((app) => app.name !== "app3");
  },
});

// 手动预加载
import { prefetchApps } from "qiankun";

prefetchApps([{ name: "app1", entry: "//localhost:8081" }]);
```

### 6.2 资源缓存

```javascript
// 使用 Service Worker 缓存
// 主应用注册 Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// sw.js
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
```

### 6.3 按需加载

```javascript
// 子应用路由懒加载
// Vue
const routes = [
  {
    path: "/about",
    component: () => import("./views/About.vue"),
  },
];

// React
const About = React.lazy(() => import("./pages/About"));
```

### 6.4 公共依赖共享

```javascript
// 方案1：externals 配置
// webpack.config.js
module.exports = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
    }
};

// 主应用引入 CDN
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.1/dist/vue-router.min.js"></script>

// 方案2：Module Federation
// webpack 5 配置
module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'main',
            shared: {
                vue: { singleton: true },
                'vue-router': { singleton: true }
            }
        })
    ]
};
```

### 6.5 子应用加载优化

```javascript
// 添加加载状态
// 主应用
<div id="subapp-container">
  <div class="loading">加载中...</div>
</div>;

// 监听加载状态
registerMicroApps(
  [
    {
      // ...
    },
  ],
  {
    beforeLoad: () => {
      showLoading();
    },
    afterMount: () => {
      hideLoading();
    },
  },
);
```

---

## 七、面试题精选

### 7.1 基础概念题

#### Q1: 什么是微前端？为什么要使用微前端？

**答案**：

微前端是一种将前端应用分解成更小、更简单的独立片段的架构模式。

**使用微前端的原因**：

1. **技术栈无关**：不同团队可以使用不同的技术栈
2. **独立开发部署**：各团队可独立开发、测试、部署
3. **增量升级**：可以逐步迁移旧系统
4. **团队自治**：降低团队间协作成本
5. **代码隔离**：避免代码耦合，降低维护成本

#### Q2: Qiankun 与 single-spa 的区别是什么？

**答案**：

| 特性       | single-spa           | qiankun             |
| ---------- | -------------------- | ------------------- |
| 配置复杂度 | 较复杂，需要手动配置 | 开箱即用            |
| 样式隔离   | 无内置方案           | 提供多种隔离方案    |
| JS 沙箱    | 无内置方案           | 提供 Proxy 沙箱     |
| 资源加载   | 需要手动处理         | HTML Entry 自动处理 |
| 子应用通信 | 需要自行实现         | 提供全局状态管理    |
| 预加载     | 无                   | 支持预加载          |

#### Q3: Qiankun 的 JS 沙箱是如何实现的？

**答案**：

Qiankun 提供了三种 JS 沙箱实现：

1. **LegacySandbox**：基于 Proxy，使用 Map 记录属性变化，适用于单实例场景
2. **ProxySandbox**：基于 Proxy，创建一个 fakeWindow 对象代理，适用于多实例场景
3. **SnapshotSandbox**：通过遍历 window 对象记录快照，适用于不支持 Proxy 的浏览器

核心原理是通过 Proxy 拦截对 window 的读写操作，将子应用对 window 的修改限制在沙箱内，卸载时恢复原始状态。

#### Q4: Qiankun 的样式隔离有哪些方案？各有什么优缺点？

**答案**：

| 方案        | 原理                              | 优点           | 缺点                         |
| ----------- | --------------------------------- | -------------- | ---------------------------- |
| Shadow DOM  | 使用 Web Components 的 Shadow DOM | 真正的样式隔离 | 部分框架不兼容，弹窗样式丢失 |
| Scoped CSS  | 给选择器添加属性选择器前缀        | 兼容性好       | 隔离不彻底，可能被覆盖       |
| CSS Modules | 编译时生成唯一类名                | 完全隔离       | 需要构建工具支持             |
| BEM 命名    | 手动添加命名空间                  | 简单可控       | 依赖团队规范                 |

### 7.2 原理深入题

#### Q5: 请描述 Qiankun 的应用加载流程

**答案**：

```
1. 路由监听
   └── 监听 URL 变化（popstate、hashchange）

2. 应用匹配
   └── 根据 activeRule 匹配需要激活的子应用

3. 资源加载（HTML Entry）
   ├── fetch 获取 HTML 内容
   ├── 解析 HTML 提取 script/style
   ├── 创建容器并插入模板
   └── 加载并执行 JS 脚本

4. 沙箱创建
   ├── 创建 JS 沙箱（Proxy）
   └── 创建样式沙箱

5. 生命周期执行
   ├── bootstrap（初始化）
   ├── mount（挂载）
   └── 渲染子应用

6. 卸载流程
   ├── unmount（卸载）
   ├── 清理沙箱
   └── 恢复原始状态
```

#### Q6: Qiankun 如何实现子应用的隔离？

**答案**：

**JS 隔离**：

- 使用 Proxy 代理 window 对象
- 子应用对 window 的修改被拦截并记录
- 卸载时恢复原始状态或丢弃修改

**样式隔离**：

- Shadow DOM：创建独立的 DOM 子树
- Scoped CSS：为选择器添加前缀

**路由隔离**：

- 劫持 history API
- 监听路由变化
- 根据路由激活/卸载子应用

**资源隔离**：

- 每个子应用有独立的执行环境
- 避免全局变量污染

#### Q7: HTML Entry 相比 JS Entry 有什么优势？

**答案**：

| 特性     | HTML Entry             | JS Entry                    |
| -------- | ---------------------- | --------------------------- |
| 配置方式 | 只需配置 HTML 地址     | 需要配置 JS 地址和 CSS 地址 |
| 资源管理 | 自动解析 HTML 中的资源 | 需要手动管理                |
| 灵活性   | 高，支持任意 HTML 结构 | 低，需要特定格式            |
| 开发体验 | 接近普通应用开发       | 需要额外配置                |
| 构建要求 | 低                     | 需要输出 UMD 格式           |

#### Q8: Qiankun 的 prefetch 预加载是如何实现的？

**答案**：

```javascript
// 预加载核心实现
const prefetch = async (entry) => {
  // 1. fetch 获取 HTML
  const html = await fetch(entry).then((res) => res.text());

  // 2. 解析获取资源链接
  const { scripts, styles } = parseHtml(html);

  // 3. 预加载资源
  const loadScript = (url) => {
    return fetch(url).then((res) => res.text());
  };

  // 4. 并行加载所有资源
  await Promise.all([
    ...scripts.map(loadScript),
    ...styles.map((url) => fetch(url)),
  ]);

  // 5. 缓存资源内容
  // 后续加载时直接使用缓存
};
```

### 7.3 实战应用题

#### Q9: 如何在 Qiankun 中实现子应用间的通信？

**答案**：

**方案1：initGlobalState**

```javascript
// 主应用
import { initGlobalState } from "qiankun";
const actions = initGlobalState({ user: null });
actions.setGlobalState({ user: { name: "admin" } });

// 子应用
export function mount(props) {
  props.onGlobalStateChange((state) => {
    console.log(state.user);
  });
}
```

**方案2：Props 传递**

```javascript
// 主应用
registerMicroApps([
  {
    name: "app1",
    props: {
      user: { name: "admin" },
      onLogout: () => {},
    },
  },
]);
```

**方案3：自定义事件**

```javascript
// 发送事件
window.dispatchEvent(
  new CustomEvent("app-event", {
    detail: { type: "login", data: {} },
  }),
);

// 接收事件
window.addEventListener("app-event", (e) => {
  console.log(e.detail);
});
```

**方案4：共享存储**

```javascript
// 使用 localStorage/sessionStorage
localStorage.setItem("shared-data", JSON.stringify(data));

// 使用 IndexedDB
// 使用第三方状态管理库
```

#### Q10: 如何解决子应用静态资源加载 404 的问题？

**答案**：

```javascript
// 方案1：动态 publicPath
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 方案2：绝对路径
// vue.config.js
module.exports = {
    publicPath: 'http://localhost:8081/'
};

// 方案3：CDN
// 静态资源上传到 CDN
module.exports = {
    publicPath: 'https://cdn.example.com/sub-app/'
};

// 方案4：nginx 配置
location /sub-app/ {
    alias /path/to/sub-app/;
}
```

#### Q11: 如何实现子应用的 keep-alive 效果？

**答案**：

```javascript
// 方案1：使用 loadMicroApp 手动控制
import { loadMicroApp } from "qiankun";

let microApp = null;

function showApp() {
  if (!microApp) {
    microApp = loadMicroApp({
      name: "app1",
      entry: "//localhost:8081",
      container: "#container",
    });
  }
}

function hideApp() {
  // 不卸载，只是隐藏
  document.getElementById("container").style.display = "none";
}

// 方案2：主应用缓存
// 使用 Vue 的 keep-alive 缓存组件

// 方案3：子应用内部缓存
// 子应用内部使用 keep-alive 缓存页面
```

#### Q12: 如何处理子应用的权限控制？

**答案**：

```javascript
// 方案1：主应用统一控制
registerMicroApps([
  {
    name: "app1",
    entry: "//localhost:8081",
    activeRule: (location) => {
      // 检查权限
      return hasPermission("/app1") && location.pathname.startsWith("/app1");
    },
  },
]);

// 方案2：通过 props 传递权限信息
registerMicroApps([
  {
    name: "app1",
    props: {
      permissions: getUserPermissions(),
    },
  },
]);

// 方案3：子应用内部控制
// 子应用根据主应用传递的权限信息控制路由和功能

// 方案4：后端接口控制
// 子应用调用接口时验证权限
```

### 7.4 场景设计题

#### Q13: 如何设计一个支持多团队协作的微前端架构？

**答案**：

```
架构设计：

1. 主应用职责
   ├── 提供统一布局（Header、Sidebar、Footer）
   ├── 管理子应用注册和加载
   ├── 提供全局状态管理
   ├── 统一登录和权限控制
   └── 提供公共组件和工具库

2. 子应用规范
   ├── 统一的技术规范文档
   ├── 统一的代码风格（ESLint、Prettier）
   ├── 统一的 Git 提交规范
   ├── 统一的 API 请求封装
   └── 统一的错误处理机制

3. 通信机制
   ├── 主应用 → 子应用：Props 传递
   ├── 子应用 → 主应用：事件/回调
   └── 子应用 → 子应用：全局状态

4. 部署策略
   ├── 主应用独立部署
   ├── 子应用独立部署
   ├── 使用 nginx 做路由分发
   └── CDN 加速静态资源

5. 开发规范
   ├── 子应用开发文档
   ├── 接口文档
   ├── 组件库文档
   └── 发布流程文档
```

#### Q14: 如何实现一个大型遗留系统的渐进式迁移？

**答案**：

```
迁移策略：

1. 评估阶段
   ├── 分析现有系统模块划分
   ├── 确定迁移优先级
   └── 制定迁移计划

2. 准备阶段
   ├── 搭建主应用框架
   ├── 配置 qiankun
   └── 建立开发规范

3. 迁移阶段（按优先级）
   ├── 选择独立模块作为试点
   ├── 将模块改造为子应用
   ├── 接入主应用
   └── 验证功能完整性

4. 迭代迁移
   ├── 逐步迁移其他模块
   ├── 保持新旧系统并行运行
   └── 灰度发布验证

5. 收尾阶段
   ├── 移除旧系统代码
   ├── 优化性能
   └── 完善文档

关键点：
- 保持 URL 兼容
- 保持用户体验一致
- 做好回滚预案
```

#### Q15: 如何处理微前端架构中的公共依赖问题？

**答案**：

```javascript
// 方案1：CDN + externals
// webpack.config.js
module.exports = {
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    axios: "axios",
  },
};

// 主应用引入 CDN
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>;

// 方案2：Module Federation（Webpack 5）
// webpack.config.js
new ModuleFederationPlugin({
  name: "main",
  shared: {
    vue: { singleton: true, requiredVersion: "^2.6.14" },
    "vue-router": { singleton: true },
  },
});

// 方案3：主应用提供公共库
// 主应用
window.sharedLibs = {
  Vue: Vue,
  VueRouter: VueRouter,
  axios: axios,
};

// 子应用
const Vue = window.sharedLibs.Vue;

// 方案4：npm 包共享
// 所有应用使用相同版本的 npm 包
// 使用 pnpm 的 workspace 特性
```

### 7.5 综合能力题

#### Q16: 微前端架构有哪些缺点？如何规避？

**答案**：

**缺点**：

1. **复杂度增加**
   - 解决：完善的文档和开发规范
   - 解决：提供脚手架工具

2. **性能开销**
   - 解决：预加载策略
   - 解决：公共依赖共享

3. **调试困难**
   - 解决：统一的日志系统
   - 解决：开发工具支持

4. **样式冲突**
   - 解决：样式隔离方案
   - 解决：CSS Modules

5. **状态共享复杂**
   - 解决：统一的状态管理方案
   - 解决：明确的数据流

#### Q17: 如何监控和排查微前端应用的问题？

**答案**：

```javascript
// 1. 全局错误捕获
window.addEventListener("error", (event) => {
  console.error("全局错误:", event);
  // 上报错误
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Promise 错误:", event);
});

// 2. 生命周期监控
registerMicroApps(
  [
    {
      // ...
    },
  ],
  {
    beforeLoad: (app) => {
      console.time(`load-${app.name}`);
    },
    afterMount: (app) => {
      console.timeEnd(`load-${app.name}`);
    },
  },
);

// 3. 性能监控
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log("性能指标:", entry);
  });
});
observer.observe({ entryTypes: ["resource", "measure"] });

// 4. 子应用状态监控
export async function mount(props) {
  // 上报子应用加载成功
  report("mount", { app: props.name });
}

// 5. 使用监控平台
// Sentry / Fundebug / 自建监控平台
```

#### Q18: 如何实现微前端架构的高可用？

**答案**：

```
高可用设计：

1. 容错机制
   ├── 子应用加载失败降级
   ├── 子应用错误边界
   └── 主应用兜底页面

2. 灰度发布
   ├── 按用户 ID 灰度
   ├── 按百分比灰度
   └── A/B 测试

3. 回滚机制
   ├── 版本管理
   ├── 快速回滚
   └── 配置回滚

4. 监控告警
   ├── 错误监控
   ├── 性能监控
   └── 业务监控

5. 灾备方案
   ├── CDN 故障降级
   ├── 接口故障降级
   └── 全站降级

代码示例：
// 子应用加载失败处理
registerMicroApps([{
    name: 'app1',
    entry: '//localhost:8081'
}], {
    beforeLoad: async (app) => {
        try {
            // 健康检查
            await checkAppHealth(app.entry);
        } catch (e) {
            // 降级处理
            return Promise.reject(new Error('应用不可用'));
        }
    }
});

// 错误边界
<ErrorBoundary fallback={<div>应用加载失败</div>}>
    <MicroApp name="app1" />
</ErrorBoundary>
```

---

## 八、最佳实践总结

### 8.1 项目结构建议

```
micro-frontend-project/
├── main-app/                    # 主应用
│   ├── src/
│   │   ├── layouts/            # 布局组件
│   │   ├── store/              # 全局状态
│   │   ├── utils/              # 工具函数
│   │   └── micro-apps/         # 子应用配置
│   └── package.json
│
├── sub-app-1/                   # 子应用1
│   ├── src/
│   │   ├── public-path.js      # publicPath 配置
│   │   └── main.js             # 入口文件（导出生命周期）
│   └── package.json
│
├── sub-app-2/                   # 子应用2
│   └── ...
│
├── shared/                      # 共享资源
│   ├── components/             # 共享组件
│   ├── utils/                  # 共享工具
│   └── styles/                 # 共享样式
│
└── docs/                        # 文档
    ├── 开发指南.md
    ├── 部署指南.md
    └── API文档.md
```

### 8.2 开发规范建议

```javascript
// 1. 子应用入口规范
// main.js
let instance = null;

export async function bootstrap() {
  console.log("[sub-app] bootstrap");
}

export async function mount(props) {
  console.log("[sub-app] mount", props);
  instance = createApp(props);
}

export async function unmount(props) {
  console.log("[sub-app] unmount");
  instance?.destroy();
  instance = null;
}

export async function update(props) {
  console.log("[sub-app] update", props);
}

// 2. 命名规范
// 子应用名称：@team/app-name
// 路由前缀：/app-name
// 容器 ID：#app-name-container

// 3. 样式规范
// 使用 CSS Modules 或 BEM 命名
// 避免使用全局样式

// 4. API 规范
// 统一的请求封装
// 统一的错误处理
```

### 8.3 部署建议

```yaml
# nginx 配置示例
server {
    listen 80;
    server_name example.com;

    # 主应用
    location / {
        root /var/www/main-app;
        try_files $uri $uri/ /index.html;
    }

    # 子应用1
    location /sub-app-1/ {
        alias /var/www/sub-app-1/;
        try_files $uri $uri/ /sub-app-1/index.html;
    }

    # 子应用2
    location /sub-app-2/ {
        alias /var/www/sub-app-2/;
        try_files $uri $uri/ /sub-app-2/index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://api-server:8080/;
    }
}
```

---

## 九、参考资料

- [Qiankun 官方文档](https://qiankun.umijs.org/zh)
- [single-spa 官方文档](https://single-spa.js.org/)
- [微前端的核心价值](https://www.yuque.com/kuitos/gky7yw/ges2th)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
- [微前端架构初探](https://tech.meituan.com/2020/02/27/meituan-waimai-micro-frontends-practice.html)
