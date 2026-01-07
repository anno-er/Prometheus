# Vue 基础

## slot 插槽

## 组件通信

## 事件总线

- vue2 new Vue() $emit $on $off
- vue3 mitt 事件总线库, 更推荐 pinia 或者 组合式 api(useXXX) + watch 实现事件总线

## v-if - v-show

## v-if - v-for 优先级

## 保留模板注释

## 组件的生命周期

## template 标签

## MVC\MVVM\MVP

- MVC: Model-View-Controller
- MVP: Model-View-Presenter
- MVVM: Model-View-ViewModel

## name 属性

## 过滤器

## v-clock & v-pre

## this 指向（vue2 与 vue3）

## 根实例访问

## 自定义指令（vue2 与 vue3）

### Vue 2 钩子函数

- `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
- `componentUpdated`: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
- `unbind`: 只调用一次，指令与元素解绑时调用。

### Vue 3 钩子函数 (与组件生命周期一致)

- `created`: 在绑定元素的 attribute 或事件监听器被应用之前调用。
- `beforeMount`: 当指令第一次绑定到元素并且在挂载父组件之前调用。
- `mounted`: 在绑定元素的父组件挂载后调用。
- `beforeUpdate`: 在更新包含组件的 VNode 之前调用。
- `updated`: 在包含组件的 VNode 及其子组件的 VNode 更新后调用。
- `beforeUnmount`: 在卸载绑定元素的父组件之前调用。
- `unmounted`: 当指令与元素解绑且父组件已卸载时，只调用一次。

### 核心变化

1. **重命名**: Vue 3 重新命名了钩子函数，使其与组件的生命周期保持一致，更易于记忆和理解。
2. **功能映射**:
   - `bind` -> `beforeMount`
   - `inserted` -> `mounted`
   - `update` -> 已移除，请使用 `updated`
   - `componentUpdated` -> `updated`
   - `unbind` -> `unmounted`
