# Vuex 状态管理

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 1. Vuex 的核心概念

### 1.1 State (单一状态树)

State 是 Vuex 中的基本数据源，用于存储应用程序的状态。

- **作用**：驱动应用的数据源。
- **示例**：
  ```javascript
  const state = {
    count: 0,
  };
  ```

### 1.2 Getter (计算属性)

Getter 类似于 Vue 组件中的计算属性，用于从 State 中派生出一些状态（如过滤、统计）。

- **作用**：对 State 进行加工处理。
- **示例**：
  ```javascript
  const getters = {
    doubleCount: (state) => state.count * 2,
  };
  ```

### 1.3 Mutation (同步修改)

Mutation 是更改 Vuex Store 中状态的唯一方法，且必须是同步函数。

- **作用**：显式地修改 State。
- **示例**：
  ```javascript
  const mutations = {
    increment(state, payload) {
      state.count += payload.amount;
    },
  };
  ```

### 1.4 Action (异步操作)

Action 类似于 Mutation，但它可以包含任意异步操作（如 API 请求），通过分发（dispatch）Mutation 来修改状态。

- **作用**：提交 Mutation，处理异步逻辑。
- **示例**：
  ```javascript
  const actions = {
    asyncIncrement({ commit }) {
      setTimeout(() => {
        commit("increment", { amount: 1 });
      }, 1000);
    },
  };
  ```

### 1.5 Module (模块化)

当应用变得复杂时，可以将 Store 分割成模块（Modules），每个模块拥有自己的 State、Mutation、Action、Getter。

- **作用**：解决单一状态树过于臃肿的问题。

---

## 2. 完整用法案例

### 2.1 安装与初始化 (store/index.js)

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    user: { name: "Admin" },
  },
  getters: {
    formattedCount: (state) => `当前计数: ${state.count}`,
  },
  mutations: {
    SET_COUNT(state, val) {
      state.count = val;
    },
  },
  actions: {
    updateCount({ commit }, val) {
      // 模拟异步请求
      setTimeout(() => {
        commit("SET_COUNT", val);
      }, 500);
    },
  },
});
```

### 2.2 在 Vue 组件中使用

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ formattedCount }}</p>
    <button @click="increment">同步增加</button>
    <button @click="asyncUpdate">异步更新</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    // 使用辅助函数映射状态
    ...mapState(["count"]),
    ...mapGetters(["formattedCount"]),
  },
  methods: {
    // 使用辅助函数映射方法
    ...mapMutations({
      add: "SET_COUNT",
    }),
    ...mapActions(["updateCount"]),

    increment() {
      this.add(this.count + 1);
    },
    asyncUpdate() {
      this.updateCount(100);
    },
  },
};
</script>
```

## 3. 为什么使用 Vuex？

1. **多组件共享状态**：避免通过 Props 或事件总线（EventBus）进行复杂且难以维护的传参。
2. **状态可追踪**：通过 Vue Devtools 可以记录每一次 Mutation 的快照，方便调试。
3. **结构规范**：强制开发者遵循特定的规则来修改状态，代码逻辑更清晰。
