# Vue 基础知识点

## 1. slot 插槽

插槽（Slot）是 Vue 提供的一种内容分发机制，允许父组件在子组件模板中插入自定义内容。

- **匿名插槽**：子组件中使用 `<slot></slot>`，父组件传入的内容将填入其中。
- **具名插槽**：子组件中使用 `<slot name="header"></slot>`，父组件使用 `v-slot:header` 或 `#header` 传入内容。
- **作用域插槽**：子组件通过插槽向父组件传递数据。
  ```vue
  <!-- 子组件 -->
  <slot :user="user"></slot>
  <!-- 父组件 -->
  <template #default="{ user }">{{ user.name }}</template>
  ```

## 2. 组件通信

Vue 组件之间的通信方式主要有以下几种：

- **父传子**：通过 `props` 属性传递数据。
- **子传父**：通过 `$emit` 触发自定义事件。
- **跨级通信**：
  - `provide` & `inject`：父组件提供，后代组件注入。
  - `$attrs` & `$listeners`（Vue 2）：传递属性和监听器。
- **非父子/全局通信**：
  - **Pinia / Vuex**：官方推荐的状态管理库。
  - **事件总线 (Event Bus)**：Vue 3 推荐使用第三方库如 `mitt`。
- **Refs**：通过 `ref` 直接访问组件实例或 DOM。

## 3. 事件总线

- **Vue 2**：通常使用一个新的 Vue 实例作为事件总线。
  ```javascript
  const bus = new Vue();
  bus.$emit("event", data);
  bus.$on("event", callback);
  ```
- **Vue 3**：Vue 3 移除了 `$on`、`$off` 和 `$once` 方法。推荐：
  - 使用第三方库 **mitt** 或 **tiny-emitter**。
  - 使用 **Pinia** 或 **组合式 API (useXXX) + watch**。

## 4. v-if 与 v-show 的区别

| 特性         | v-if                       | v-show                        |
| :----------- | :------------------------- | :---------------------------- |
| **渲染方式** | 动态创建或销毁 DOM 元素    | 仅切换 CSS 的 `display: none` |
| **性能**     | 初始渲染开销小，切换开销大 | 初始渲染开销大，切换开销小    |
| **场景**     | 条件不经常改变时           | 频繁切换显示状态时            |

## 5. v-if 与 v-for 的优先级

- **Vue 2**：`v-for` 的优先级高于 `v-if`。如果两者放在一起，`v-if` 会在每个循环中执行，非常消耗性能。
- **Vue 3**：`v-if` 的优先级高于 `v-for`。这意味着 `v-if` 无法访问 `v-for` 中的变量，会报错。
- **建议**：永远不要在同一个元素上同时使用两者。应先通过 `computed` 过滤列表，或者在外层嵌套 `<template v-if="...">`。

## 6. 保留模板注释

在 Vue 中，默认情况下，生产环境会移除模板中的 HTML 注释。如果需要保留：

- 在 Vue 2 中，配置 `comments: true`。
- 在 Vue 3 中，使用编译器选项 `whitespace: 'preserve'`（通常不需要手动配置注释，Vue 3 对空白字符处理更智能）。

## 7. 组件的生命周期

组件从创建到销毁的过程。主要钩子如下：

- **创建阶段**：`beforeCreate` (初始化前), `created` (数据观测已完成)。
- **挂载阶段**：`beforeMount` (模版编译后), `mounted` (挂载到 DOM)。
- **更新阶段**：`beforeUpdate` (数据更新前), `updated` (视图更新后)。
- **销毁阶段**：
  - Vue 2: `beforeDestroy`, `destroyed`
  - Vue 3: `beforeUnmount`, `unmounted`
- **缓存组件**：`activated`, `deactivated` (配合 `keep-alive`)。

## 8. template 标签

- `<template>` 是一个不可见的包装元素，不会被渲染到真实 DOM 中。
- 常用于包裹多个元素进行 `v-if` 或 `v-for` 分组，而不想增加额外的 DOM 层级。

## 9. MVC、MVVM 与 MVP 架构模式

- **MVC (Model-View-Controller)**：模型-视图-控制器。通信是单向的。
- **MVP (Model-View-Presenter)**：演变自 MVC，Presenter 负责逻辑，View 不直接访问 Model。
- **MVVM (Model-View-ViewModel)**：Vue 的核心模式。
  - **Model**：数据。
  - **View**：模板/视图。
  - **ViewModel**：连接层（Vue 实例），通过**数据绑定**和**DOM 事件监听**实现视图与数据的自动同步。

## 10. name 属性的作用

- **调试**：在 Vue Devtools 中显示组件名称。
- **递归组件**：组件内部调用自身时需要 `name`。
- **keep-alive**：通过 `include` 或 `exclude` 属性匹配缓存组件。

## 11. 过滤器 (Filters)

- **Vue 2**：支持 `{{ data | filter }}` 语法。
- **Vue 3**：**已移除过滤器**。官方建议使用 `methods` 或 `computed` 代替。

## 12. v-cloak 与 v-pre

- **v-cloak**：保持在元素上直到关联实例结束编译。常配合 CSS `[v-cloak] { display: none; }` 防止闪烁（在网速慢时看到未编译的模板）。
- **v-pre**：跳过这个元素和它的子元素的编译过程。用于显示原始 Mustache 标签或提升大型静态内容的性能。

## 13. this 指向（Vue 2 vs Vue 3）

- **Vue 2**：组件方法、生命周期钩子中的 `this` 始终指向当前 Vue 实例。
- **Vue 3**：
  - 在 `setup()` 函数中，`this` 为 `undefined`。
  - 在 `Options API`（如 `methods`）中，`this` 仍然指向组件实例。
  - **原因**：Vue 3 的 `setup` 在组件实例完全创建前执行。

## 14. 根实例访问

- **Vue 2**：通过 `this.$root` 访问。
- **Vue 3**：
  - `getCurrentInstance().appContext.config.globalProperties`（获取全局属性）。
  - 在 `setup` 中没有直接的 `this.$root`，推荐使用 `provide/inject` 传递全局状态。

## 15. 自定义指令

### Vue 2 钩子函数

- `bind`, `inserted`, `update`, `componentUpdated`, `unbind`

### Vue 3 钩子函数 (与生命周期一致)

- `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`

### 核心变化

- Vue 3 重命名了钩子以匹配组件生命周期。
- 移除了 `update`，合并到 `updated` 中。

## 16. 单向数据流和双向数据流

- **单向数据流**：数据从父传向子，子组件通过事件通知父组件修改。保证了应用数据流向的可预测性。
- **双向绑定**：Vue 使用 `v-model` 实现视图与数据的同步更新。
- **Vue 3 defineModel**：Vue 3.4+ 引入的新语法，极大地简化了子组件中的双向绑定。

## 17. v-html 指令

- 用于渲染普通的 HTML 字符串。
- **安全性**：极易受到 XSS 攻击。**永远不要**在用户提交的内容上使用 `v-html`。

## 18. 创建 Vue 组件模板的方法

1. **单文件组件 (SFC)**：`.vue` 文件，最推荐的方式。
2. **字符串模板**：`template: '<div>...</div>'`。
3. **渲染函数 (Render Functions)**：使用 `h()` 或 `createElement`。
4. **JSX/TSX**：在 JS 中编写类似 HTML 的代码。

## 19. v-model 原理

- `v-model` 本质上是语法糖。
- **Vue 2**：默认对应 `value` 属性和 `input` 事件。
- **Vue 3**：默认对应 `modelValue` 属性和 `update:modelValue` 事件。
  ```vue
  <!-- Vue 3 展开形式 -->
  <Child :modelValue="foo" @update:modelValue="foo = $event" />
  ```

## 20. watch 与 watchEffect 的区别

- **watch**：
  - 必须指明监听的数据源。
  - 默认是惰性的（第一次不执行，除非配置 `immediate: true`）。
  - 可以获取 `oldValue`。
- **watchEffect**：
  - 自动收集依赖（代码中用到谁就监听谁）。
  - 初始化时会立即执行一次。
  - 无法获取旧值。

## 21. 键盘事件修饰符

- `@keyup`: 键盘弹起。
- `@keydown`: 键盘按下。
- **常用按键别名**：`.enter`, `.tab`, `.delete`, `.esc`, `.space`, `.up`, `.down` 等。

## 22. 官方风格指南建议

- **组件名**：应始终是多个单词（除了根组件 `App`），避免与 HTML 标签冲突。
- **Prop 定义**：应尽可能详细，指定类型。
- **v-for 键值**：总是配合 `key` 使用，不要使用 `index`（如果列表会变动）。
- **私有属性名**：在插件或混入中使用 `$_` 前缀。

## 23. 生命周期钩子总结 (对比)

| 生命周期阶段 | Vue 2           | Vue 3 (Options API) | Vue 3 (Composition API) |
| :----------- | :-------------- | :------------------ | :---------------------- |
| **创建**     | `beforeCreate`  | `beforeCreate`      | `setup`                 |
| **创建完成** | `created`       | `created`           | `setup`                 |
| **挂载前**   | `beforeMount`   | `beforeMount`       | `onBeforeMount`         |
| **挂载后**   | `mounted`       | `mounted`           | `onMounted`             |
| **更新前**   | `beforeUpdate`  | `beforeUpdate`      | `onBeforeUpdate`        |
| **更新后**   | `updated`       | `updated`           | `onUpdated`             |
| **卸载前**   | `beforeDestroy` | `beforeUnmount`     | `onBeforeUnmount`       |
| **卸载后**   | `destroyed`     | `unmounted`         | `onUnmounted`           |

## 24. Vue event 事件对象

- 在模板中可以通过 `$event` 访问原始 DOM 事件。
- 如果是自定义事件，`$event` 是传出来的参数。
- 默认情况下，事件处理函数的第一个参数就是 `event` 对象。

## 25. 修饰符 (Modifiers)

- **事件修饰符**：`.stop` (阻止冒泡), `.prevent` (阻止默认行为), `.capture`, `.self`, `.once`。
- **按键修饰符**：`.enter`, `.tab`, `.ctrl`, `.shift`。
- **表单修饰符**：`.lazy`, `.number`, `.trim`。

## 26. 对象添加属性响应式问题

- **Vue 2**：通过 `this.obj.newProp = 'val'` 直接添加属性**不是响应式**的。需使用 `Vue.set(obj, key, val)`。
- **Vue 3**：使用 `Proxy` 实现响应式，直接添加属性**是响应式**的。

## 27. Computed 与 Watch 的区别

- **Computed**：
  - 支持**缓存**，只有依赖项改变时才重新计算。
  - 必须有返回值。
  - 适用于“一个值由多个值计算而来”的场景。
- **Watch**：
  - **不支持缓存**，数据变了就执行逻辑。
  - 适用于“一个值变化引发一系列异步操作或重逻辑”的场景。

## 28. v-for 中 key 的作用

- **核心作用**：给虚拟 DOM 节点添加唯一标识，帮助 Vue 的 **Diff 算法**更高效地识别和复用节点。
- **避免使用 index**：如果列表顺序会发生变化，使用 `index` 作为 `key` 会导致不必要的 DOM 渲染或状态错误（如输入框内容错位）。

## 29. Vue 实例挂载过程

1. **初始化**：初始化生命周期、事件、数据响应式等。
2. **模板编译**：将 `template` 编译为 `render` 函数（如果是运行时版本则跳过此步，直接使用 webpack 预编译好的）。
3. **渲染**：执行 `render` 函数，生成**虚拟 DOM**。
4. **打补丁 (Patch)**：将虚拟 DOM 转换为真实 DOM 并插入页面。
5. **挂载完成**：触发 `mounted` 钩子。

## 30. 对 Vue 的理解

- **渐进式框架**：可以只用一部分，也可以全家桶。
- **声明式编程**：只需描述“是什么”，Vue 负责“怎么做”。
- **组件化**：将页面拆分为可复用的单元。
- **数据驱动**：通过响应式系统自动更新视图，减少手动 DOM 操作。

## 31. Class 与 Style 的绑定方式

- **Class 绑定**：
  - 对象语法：`:class="{ active: isActive }"`
  - 数组语法：`:class="[activeClass, errorClass]"`
- **Style 绑定**：
  - 对象语法：`:style="{ color: activeColor, fontSize: fontSize + 'px' }"`
  - 数组语法：`:style="[baseStyles, overridingStyles]"`

## 32. 表单修饰符详解

- **.lazy**：转为 `change` 事件同步，而不是 `input` 事件（失去焦点或回车才更新）。
- **.number**：输入字符串转为有效的数字类型。
- **.trim**：过滤首尾空白字符。

## 33. v-for 遍历对象的顺序

- 在 Vue 中，`v-for` 遍历对象时，是基于 `Object.keys()` 的结果。
- 遍历顺序取决于 JS 引擎对对象属性的枚举顺序（通常是按创建顺序，但数字键会被排在最前）。

## 34. e.target 与 e.currentTarget 的区别

- **e.target**：实际触发事件的元素（可能是子元素）。
- **e.currentTarget**：绑定事件监听器的元素（事件冒泡到的当前元素）。
