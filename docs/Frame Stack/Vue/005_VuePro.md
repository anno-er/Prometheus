# Vue 进阶

## 1. DIFF 算法的原理

DIFF 算法的核心原理是通过比较新旧两棵虚拟 DOM 树,找出不同点,并且只更新必要的部分以达到高效更新真实 DOM 的目的。这种差异化更新策略能够显著提升性能,避免不必要的 DOM 操作。

**核心步骤：**

1.  **同层比较**：只对同级别的节点进行比较，不跨层级比较。
2.  **Key 值对比**：通过 `key` 唯一标识符判断节点是否发生移动、新增或删除，复用已有节点。
3.  **深度优先遍历**：通过递归的方式对比子节点，直到找到所有差异。
4.  **双端比较（Vue 2）/ 快速 Diff（Vue 3）**：优化了列表更新的性能。

## 2. Vue SEO 的优化措施有哪些？

Vue 是一个单页应用框架,默认情况下,搜索引擎爬虫无法直接获取到 Vue 应用的内容。为了优化 Vue 应用的 SEO,我们可以采取以下措施:

1.  **服务器端渲染 (SSR)**: 使用 Vue Server-Side Rendering (Vue SSR) 或者 Nuxt.js 框架,将 Vue 组件在服务器端渲染成 HTML,使爬虫能直接读取。
2.  **预渲染 (Prerendering)**: 使用 `prerender-spa-plugin` 等工具在构建时生成静态 HTML 文件。
3.  **Meta 标签动态更新**: 使用 `vue-meta` 或 `vue-head` 动态修改 `title`、`description` 和 `keywords`。
4.  **友好的 URL**: 使用 Vue Router 的 `history` 模式，避免 `#!` 锚点。
5.  **站点地图 (Sitemap)**: 生成动态 Sitemap 并提交给搜索引擎。

## 3. Vue 响应式原理（Object.defineProperty vs Proxy）

1.  **Object.defineProperty (Vue 2)**:
    - **原理**：通过 `Object.defineProperty` 拦截对象属性的 `get` 和 `set` 操作。
    - **局限性**：无法检测到对象属性的新增或删除；无法监听数组下标的变化。
    - **实现代码**：
      ```js
      Object.defineProperty(obj, "property", {
        get() {
          /* 收集依赖 */
        },
        set(newValue) {
          /* 触发更新 */
        },
      });
      ```

2.  **Proxy (Vue 3)**:
    - **原理**：使用 ES6 的 `Proxy` 创建对象的代理，拦截对目标对象的所有操作（如读取、赋值、删除、枚举等）。
    - **优势**：支持拦截数组变化、属性新增/删除；性能更好；不需要递归遍历所有属性。
    - **实现代码**：
      ```js
      const proxy = new Proxy(obj, {
        get(target, property) {
          /* track 收集依赖 */ return target[property];
        },
        set(target, property, newValue) {
          /* trigger 触发更新 */ target[property] = newValue;
          return true;
        },
      });
      ```

## 4. 为什么在 Vue3 中很多 API 只能在 setup 中执行？

`setup` 函数是 Composition API 的唯一入口，它在组件实例创建之前、props 解析之后同步执行。

- **上下文依赖**：Vue 通过内部的 `currentInstance` 变量来追踪正在初始化的组件实例。
- **实例绑定**：生命周期钩子（如 `onMounted`）和依赖注入（如 `provide`/`inject`）需要注册到当前组件实例上。
- **限制原因**：如果在 `setup` 外部或异步回调中调用，`currentInstance` 可能为空或指向错误的实例，导致 API 无法正确工作。

## 5. Vue 有了数据响应式，为何还要 diff？

- **响应式是手段**：响应式系统的作用是监听数据变化，并通知相关的观察者（Watcher/Effect）。
- **Diff 是优化**：如果数据一变就全量重绘 DOM，性能极差。Diff 算法能计算出最小的 DOM 变更路径，实现**精准更新**。
- **颗粒度平衡**：Vue 的响应式是组件级的（Vue 2 之后），一个数据变化会触发整个组件重新渲染，Diff 确保在组件内部只更新必要的节点。

## 6. Vue3 为什么不需要时间分片？

- **响应式系统性能提升**：Vue 3 基于 Proxy 的响应式系统更高效，初始化和更新开销大幅降低。
- **模板编译优化**：Vue 3 引入了静态提升（Hoisting）和 Patch Flags，使得渲染函数在执行时能跳过静态节点，Diff 效率极高。
- **更新颗粒度**：Vue 的更新是组件级的，通常一个更新任务很小，不会长时间阻塞主线程，因此不需要像 React 那样复杂的 Fiber 调度和时间分片。

## 7. Vue3 为什么要引入 Composition API？

Vue 3 引入 Composition API 主要是为了解决 Vue 2 Options API 在大型项目中的痛点：

1.  **更好的逻辑复用**：取代 Mixins，避免命名冲突和数据来源不明。
2.  **更好的代码组织**：按功能逻辑聚合代码，而不是按 `data`/`methods` 选项拆分，提高可维护性。
3.  **更好的类型推导**：对 TypeScript 原生友好，不需要复杂的类型标注。
4.  **更好的 Tree-shaking**：函数式 API 更有利于构建工具剔除未使用的代码，减小体积。

## 8. 谈谈 Vue 事件机制，并手写 $on、$off、$emit、$once

Vue 的事件系统本质上是一个**发布-订阅模式**。

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  $on(event, fn) {
    (this.events[event] || (this.events[event] = [])).push(fn);
    return this;
  }

  $emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((fn) => fn.apply(this, args));
    }
    return this;
  }

  $off(event, fn) {
    if (!arguments.length) {
      this.events = {};
      return this;
    }
    if (!this.events[event]) return this;
    if (arguments.length === 1) {
      this.events[event] = null;
      return this;
    }
    this.events[event] = this.events[event].filter(
      (f) => f !== fn && f.fn !== fn,
    );
    return this;
  }

  $once(event, fn) {
    const wrapper = (...args) => {
      this.$off(event, wrapper);
      fn.apply(this, args);
    };
    wrapper.fn = fn; // 方便 $off 查找
    this.$on(event, wrapper);
    return this;
  }
}
```

## 9. computed 计算值为什么还可以依赖另外一个 computed 计算值？

这是因为 Vue 的响应式系统支持**依赖收集的嵌套与传递**。

- **依赖追踪**：当一个 `computed` 被访问时，它会将自己作为“观察者”订阅其内部依赖的数据。
- **级联响应**：如果 A 依赖 B，B 依赖数据 C。当 C 变化时，会触发 B 的更新，B 接着触发 A 的更新。
- **缓存机制**：`computed` 具有缓存性，只有当它依赖的数据真正发生变化时，才会标记为 `dirty` 并重新计算。

## 10. 说下 vm.$set 原理

`vm.$set` 是为了解决 Vue 2 无法检测对象新增属性的问题。

- **原理**：
  1.  检查目标对象是否是响应式的（是否存在 `__ob__`）。
  2.  如果是数组，调用重写的 `splice` 方法触发响应式。
  3.  如果是对象，且属性已存在，直接赋值。
  4.  如果是新属性，通过 `defineReactive` 将新属性转为响应式，并手动触发该对象 `__ob__.dep` 的通知（notify）。

## 11. 怎么在 Vue 中定义全局方法?

1.  **Vue.prototype (Vue 2)**: `Vue.prototype.$myMethod = ...`
2.  **globalProperties (Vue 3)**: `app.config.globalProperties.$myMethod = ...`
3.  **插件机制**: 实现 `install` 方法，通过 `app.use()` 挂载。
4.  **Composition API (Vue 3)**: 创建共享的 Composable 函数并在需要的组件中引入（推荐）。

## 12. Vue 中父组件怎么监听到子组件的生命周期？

1.  **Vue 2**: 使用 `@hook` 指令。例如 `@hook:mounted="handleChildMounted"`。
2.  **Vue 3**: 使用 `v-on` 监听生命周期事件。例如 `@vnode-mounted="handleChildMounted"`。
3.  **手动 Emit**: 在子组件的钩子函数中显式 `$emit` 事件。

## 13. Vue 组件里写的原生 addEventListener 监听事件，要手动去销毁吗？

**必须手动销毁**。

- **原因**：Vue 只能自动清理指令绑定的事件监听。原生 `addEventListener` 绑定的事件不会随组件销毁而移除，如果不手动清理，会造成内存泄漏，甚至在组件销毁后依然执行回调逻辑导致报错。
- **做法**：在 `beforeUnmount` (Vue 3) 或 `beforeDestroy` (Vue 2) 钩子中调用 `removeEventListener`。

## 14. 说说 Vue3 中的响应式设计原理

Vue 3 采用了基于 **Proxy** 的响应式系统，核心包含三部分：

1.  **Proxy 代理**：拦截对象的读取（get）和设置（set）操作。
2.  **依赖收集 (Track)**：在 `get` 时，记录当前的 `effect`（副作用函数）到 `targetMap` 中。
3.  **派发更新 (Trigger)**：在 `set` 时，从 `targetMap` 找到对应的 `effect` 列表并重新执行。
4.  **Reflect**：在拦截器中使用 `Reflect.get/set` 确保正确的 `this` 指向和操作行为。

## 15. Vue 中，created 和 mounted 两个钩子之间调用时间差值受什么影响?

主要受以下因素影响：

1.  **组件模板复杂度**：模板越复杂，编译和生成虚拟 DOM 的耗时越长。
2.  **子组件的初始化**：`mounted` 会等待所有子组件挂载完成。如果子组件多且逻辑复杂，差值会变大。
3.  **数据处理逻辑**：如果在 `created` 中有耗时的同步计算，会阻塞后续的挂载流程。
4.  **DOM 操作开销**：初次渲染时创建真实 DOM 节点的开销。

## 16. Vue 中，推荐在哪个生命周期发起请求？

通常推荐在 **`created`** 或 **`onBeforeMount`** 中发起请求。

- **优点**：能更早地开始异步获取数据，减少页面空白时间。
- **注意点**：
  - 如果请求需要操作 DOM，则必须放在 `mounted` 中。
  - 在 SSR（服务端渲染）中，只有 `created` 会在服务端执行，`mounted` 仅在客户端执行。

## 17. 为什么 React 需要 Fiber 架构，而 Vue 却不需要？

1.  **更新机制不同**：
    - **React**：数据变化时会从根节点开始重新渲染整个虚拟 DOM 树（除非使用 `memo`）。对于大型项目，这个过程可能超过 16ms 导致掉帧。Fiber 通过时间分片将任务切分，保证主线程响应。
    - **Vue**：由于其精准的响应式系统，Vue 知道哪个组件需要更新。更新是以组件为单位的，任务量通常很小，不需要中断和恢复。
2.  **优化手段不同**：Vue 在编译阶段做了大量静态优化（Patch Flags 等），使得运行时开销极小。

## 18. SPA（单页应用）首屏加载速度慢怎么解决？

1.  **路由懒加载**：使用 `import()` 异步加载组件。
2.  **静态资源优化**：开启 Gzip/Brotli 压缩，使用 CDN 加速。
3.  **Tree-shaking**：移除未使用的代码。
4.  **SSR/预渲染**：提前生成 HTML 结构。
5.  **按需引入**：如 UI 组件库的按需加载。
6.  **骨架屏**：提升用户感知速度。

## 19. 说下 Vite 的原理

Vite 充分利用了浏览器的 **原生 ES 模块 (ESM)** 支持。

- **开发环境**：无需打包。浏览器请求哪个文件，Vite 就实时转换该文件并返回。利用 `HTTP` 缓存，速度极快。
- **生产环境**：使用 Rollup 进行打包，通过插件系统实现与开发环境一致的体验。
- **热更新 (HMR)**：基于 ESM 的热更新，只更新修改的模块，不重新加载整个页面。

## 20. Vue2.0 为什么不能检查数组的变化，该怎么解决？

- **原因**：`Object.defineProperty` 对数组下标的监控性能开销过大，且无法监听数组长度的变化。
- **解决方法**：
  1.  **拦截原型方法**：Vue 2 重写了数组的 7 个方法（`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`）来触发更新。
  2.  **$set**：通过 `vm.$set` 修改数组指定索引。
  3.  **$delete**：移除元素。

## 21. 说说 Vue 页面渲染流程

1.  **模板编译**：将 Template 转换为渲染函数（Render Function）。
2.  **初始化实例**：初始化响应式数据、事件和生命周期。
3.  **执行渲染**：运行渲染函数生成虚拟 DOM。
4.  **挂载/补丁 (Patch)**：将虚拟 DOM 转换为真实 DOM 并插入页面，同时建立数据与 DOM 的订阅关系。
5.  **响应式更新**：数据变化时触发 Effect，重新执行渲染函数并进行 Diff 比较，最小化更新 DOM。

## 22. 如果使用 Vue3.0 实现一个 Modal，你会怎么进行设计?

1.  **Teleport**：将 Modal 内容挂载到 `body` 或指定节点，避免受父级样式（如 `overflow: hidden`）影响。
2.  **双向绑定**：使用 `v-model` 或 `defineEmits` 控制显示/隐藏。
3.  **插槽 (Slots)**：通过 `default` 和 `header`/`footer` 插槽提供灵活性。
4.  **Composition API**：封装 `useModal` 逻辑，管理状态（显示、确认、取消）。
5.  **动画支持**：包裹 `<Transition>` 组件。

## 23. Vue 3.0 中 Tree-shaking 特性是什么，并举例进行说明？

Tree-shaking 指的是在打包过程中“摇掉”未被引用的代码。

- **实现方式**：Vue 3 将所有 API 改为具名导出。
- **例子**：如果你没有在项目中使用 `Transition` 或 `v-model`，那么它们对应的运行时代码将不会出现在最终的打包文件中。
- **对比**：Vue 2 的全局 API 是直接挂在 Vue 实例上的，即使不使用也会被打包。

## 24. Vue3.0 所采用的 Composition API 与 Vue2.x 使用s的 Options API 有什么区别？

- **逻辑组织**：Options API 将代码分散在 `data`, `methods` 等处；Composition API 将相关逻辑封装在一起。
- **代码复用**：Options API 使用 Mixins（易冲突、来源不明）；Composition API 使用 Composables（清晰、灵活）。
- **TypeScript**：Composition API 对类型推导的支持远好于基于对象的 Options API。

## 25. Vue3.0 性能提升主要是通过哪几方面体现的？

1.  **Proxy 响应式**：初始化更快，内存占用更少。
2.  **静态提升 (Hoisting)**：减少了渲染函数的重复创建开销。
3.  **Patch Flags**：Diff 时仅检查动态绑定的节点。
4.  **树结构拍平 (Block Tree)**：减少了 Diff 遍历的深度。
5.  **Tree-shaking**：减小了包体积。

## 26. Vue3.0 的设计目标是什么？做了哪些优化?

- **目标**：更小、更快、更友好、更易维护。
- **优化**：
  - 源码采用 Monorepo 管理，解耦模块。
  - 采用 TypeScript 重构。
  - 引入 Composition API 提升开发体验。
  - 深度优化编译器和运行时性能。

## 27. 你是怎么处理 Vue 项目中的错误的？

1.  **全局错误捕获**：使用 `app.config.errorHandler` (Vue 3) 或 `Vue.config.errorHandler` (Vue 2)。
2.  **组件级捕获**：使用 `errorCaptured` 生命周期钩子。
3.  **异步错误处理**：在 API 请求中使用 `try...catch`。
4.  **网络层拦截**：通过 Axios 响应拦截器统一处理 401、500 等状态码。
5.  **上报系统**：集成 Sentry 或自建日志系统，利用 `navigator.sendBeacon` 发送错误日志。

## 28. keepAlive 的作用与原理

`<keep-alive>` 是 Vue 的内置组件，用于缓存不活动的组件实例，避免重复渲染，提升性能。

**核心特性：**

1.  **组件缓存**：被包裹的组件在切换时不会被销毁，而是被缓存起来，再次激活时直接复用。
2.  **专属生命周期**：
    - `activated`：组件被激活时调用
    - `deactivated`：组件被停用时调用
3.  **属性配置**：
    - `include`：匹配的组件会被缓存（字符串、正则、数组）
    - `exclude`：匹配的组件不会被缓存
    - `max`：最多缓存多少组件实例（LRU 策略）

**基本用法：**

```vue
<template>
  <keep-alive include="Home,About" :max="10">
    <component :is="currentComponent" />
  </keep-alive>
</template>

<script setup>
import { ref } from "vue";
import Home from "./Home.vue";
import About from "./About.vue";

const currentComponent = ref(Home);
</script>
```

**配合路由使用：**

```vue
<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
```

**实现原理：**

1.  **缓存机制**：`keep-alive` 内部维护一个 `cache` 对象和一个 `keys` 数组，分别存储缓存的组件实例和对应的 key。
2.  **渲染控制**：在 `render` 函数中，通过检查 `include` 和 `exclude` 判断是否需要缓存。
3.  **LRU 策略**：当缓存数量超过 `max` 时，使用最近最少使用算法淘汰最久未访问的组件。
4.  **生命周期管理**：通过 `shapeFlag` 标记组件为 `KEEP_ALIVE`，在组件卸载时调用 `deactivate`，激活时调用 `activate`。

**核心源码简化：**

```javascript
const KeepAlive = {
  name: "KeepAlive",
  setup(props, { slots }) {
    const cache = new Map();
    const keys = new Set();

    let current = null;

    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (cached) {
        cached.component?.unmount();
        cache.delete(key);
        keys.delete(key);
      }
    }

    return () => {
      const vnode = slots.default()[0];

      if (cache.has(vnode.type)) {
        const cached = cache.get(vnode.type);
        cached.component?.update();
      } else {
        cache.set(vnode.type, vnode);
        keys.add(vnode.type);

        if (props.max && keys.size > props.max) {
          pruneCacheEntry(keys.values().next().value);
        }
      }

      return vnode;
    };
  },
};
```

**适用场景：**

1.  **表单页面**：用户填写到一半切换页面，返回时保留填写内容。
2.  **列表详情页**：从详情页返回列表页时保留滚动位置和筛选条件。
3.  **Tab 切换**：多个 Tab 页面频繁切换时保持各页面状态。
4.  **性能优化**：避免重复渲染复杂组件，减少 HTTP 请求。

**注意事项：**

1.  **内存占用**：缓存过多组件会增加内存消耗，需合理设置 `max`。
2.  **数据更新**：缓存组件的数据不会自动更新，需在 `activated` 中手动刷新。
3.  **生命周期**：`created` 和 `mounted` 只执行一次，数据初始化逻辑需考虑缓存场景。
4.  **嵌套限制**：`keep-alive` 要求只有一个子组件，不能与 `v-for` 一起使用。
