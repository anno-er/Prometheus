# Pinia 状态管理

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。它不仅适用于 Vue 3，也通过官方插件支持 Vue 2。

## 1. Pinia 简介与核心优势

Pinia 被视为 Vuex 的继任者，旨在提供更简单、更直观的状态管理体验。

### 核心优势

- **TypeScript 支持**: Pinia 提供了一流的类型推断，无需额外的配置即可在 TS 中完美运行。
- **更轻量**: 体积非常小（约 1kb），对应用性能几乎没有影响。
- **直观的 API**: 移除了 Vuex 中晦涩难懂的 `mutations`，直接通过 `actions` 修改状态，支持同步和异步。
- **Devtools 支持**: 完美集成 Vue Devtools，支持时间旅行调试。
- **模块化设计**: 每一个 Store 都是独立的，不再有嵌套的 `modules` 概念，通过扁平化的方式组织 Store。

### 与 Vuex 的区别

| 特性           | Vuex                          | Pinia                         |
| :------------- | :---------------------------- | :---------------------------- |
| **Mutations**  | 必须通过 Mutations 修改 State | 已移除，直接在 Actions 中修改 |
| **TypeScript** | 配置复杂，类型支持较弱        | 原生支持，类型推断极佳        |
| **模块化**     | 嵌套 modules，命名空间复杂    | 扁平化 Store，自动代码分割    |
| **体积**       | 较重                          | 极轻量 (约 1kb)               |

## 2. 安装与基础配置

### 安装

使用你喜欢的包管理器进行安装：

```bash
npm install pinia
# 或
yarn add pinia
# 或
pnpm add pinia
```

### 基础配置

在 Vue 应用的入口文件（通常是 `main.js` 或 `main.ts`）中创建一个 pinia 实例并挂载：

```javascript
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
```

---

## 3. 定义 Store 的两种方式

Pinia 提供了两种方式来定义 Store，你可以根据团队习惯或项目复杂度选择最合适的一种。

### Option Store (选项式)

类似于 Vue 2 的选项式 API，通过 `state`、`getters` 和 `actions` 属性来组织。

```javascript
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

### Setup Store (组合式)

类似于 Vue 3 的组合式 API，这种方式更灵活，适合处理复杂的逻辑。

```javascript
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // state
  const count = ref(0);
  const name = ref("Eduardo");

  // getters
  const doubleCount = computed(() => count.value * 2);

  // actions
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
```

---

## 4. State、Getters 和 Actions 详解

### State (数据源)

`state` 是 Store 的核心，用于定义需要共享的数据。

- **访问与修改**:
  ```javascript
  const store = useCounterStore();
  store.count++; // 直接修改
  store.$patch({ count: store.count + 1, name: "Aoy" }); // 批量修改
  store.$reset(); // 重置为初始状态 (仅适用于 Option Store)
  ```

### Getters (计算属性)

`getters` 相当于 Store 的计算属性，它们的值会被缓存。

- **基本用法**:
  ```javascript
  getters: {
    // 自动推断返回类型
    doubleCount: (state) => state.count * 2,
    // 使用其他 getter
    doublePlusOne(): number {
      return this.doubleCount + 1;
    },
  }
  ```

### Actions (业务逻辑)

`actions` 相当于组件中的 `methods`。它们可以包含异步逻辑。

- **基本用法**:
  ```javascript
  actions: {
    async fetchUserData(userId) {
      try {
        this.userData = await api.getUser(userId);
      } catch (error) {
        console.error(error);
      }
    },
  }
  ```

---

## 5. 在组件中使用 Store

### 基础用法

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">Increment</button>
  </div>
</template>
```

### Store 解构响应式问题 (storeToRefs)

注意：直接解构 Store 会导致数据失去响应式。为了保持响应式，需要使用 `storeToRefs`。

```vue
<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
// ❌ 这种方式会破坏响应式
// const { count, doubleCount } = counter;

// ✅ 使用 storeToRefs，方法可以直接解构
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;
</script>
```

---

## 6. Pinia 插件与持久化

Pinia 可以通过插件进行扩展，最常用的功能之一就是状态持久化。

### 持久化存储 (pinia-plugin-persistedstate)

如果你希望刷新页面后 Store 中的数据依然存在，可以使用持久化插件。

1. **安装**:

   ```bash
   npm install pinia-plugin-persistedstate
   ```

2. **配置**:

   ```javascript
   import { createPinia } from "pinia";
   import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

   const pinia = createPinia();
   pinia.use(piniaPluginPersistedstate);
   ```

3. **在 Store 中开启**:
   ```javascript
   export const useUserStore = defineStore("user", {
     state: () => ({ token: "" }),
     persist: true, // 开启持久化
   });
   ```

---

## 7. 总结

Pinia 以其简洁的 API、卓越的 TypeScript 支持和轻量级的体积，成为了 Vue 3 项目中状态管理的首选。

- **State**: 定义共享数据。
- **Getters**: 定义基于 state 的派生状态。
- **Actions**: 定义修改状态的方法（支持异步）。
- **storeToRefs**: 用于解构 Store 时保持响应式。
- **插件机制**: 方便扩展功能，如持久化存储。
