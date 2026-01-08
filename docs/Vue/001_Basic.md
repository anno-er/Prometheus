# Vue 基础

## slot 插槽

## 组件通信

- 父组件向子组件通信：props
- 子组件向父组件通信：$emit
- 非父子组件通信：事件总线（vue2 与 vue3 实现方式不同）
  - vue2 事件总线：new Vue() $emit $on $off
  - vue3 事件总线：mitt 事件总线库, 更推荐 pinia 或者 组合式 api(useXXX) + watch 实现事件总线
- provide & inject：跨层级组件通信，父组件通过 provide 提供数据，子组件通过 inject 注入数据。
- 插槽（slot）：子组件可以在父组件中定义插槽，父组件可以在插槽中插入内容。
- ref

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

## 单向数据流和双向数据流

- 单向：数据只能从父组件流向子组件，子组件不能直接修改父组件的数据。
- 双向：双向绑定值，指的是 defineModel。

## v-html

- 渲染 html 字符串
- 注意：不能渲染包含用户输入的内容，因为它会导致 XSS 攻击。

```vue
<div v-html="htmlContent"></div>
```

## 创建 Vue 组件模板的方法

- 单文件组件（SFC）
- 内联模板
- 渲染函数
- 字符串模板

```vue
<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>
```

```javascript
new Vue({
  el: "#app",
  template: "<div>Hello, {{ name }}!</div>",
  data: {
    name: "Vue",
  },
});

Vue.component("my-component", {
  template: "<div>A custom component!</div>",
});

Vue.component("render-function", {
  render: function (createElement) {
    return createElement("div", "This is created by a render function");
  },
});
```

## v-model

- 用于在表单元素（如输入框、复选框、单选框等）和 Vue 实例的数据之间创建双向绑定。
- 当用户在表单元素中输入内容时，Vue 实例中的数据会自动更新；反之，当 Vue 实例中的数据发生变化时，表单元素中的内容也会同步更新。

```vue
<!----- Child.vue ------>
<script setup>
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>

<!------ Parent.vue ----->
<Child v-model="foo" />
<!-- 编译成 
<Child :modelValue="foo" @update:modelValue="($event) => (foo = $event)" />
-->
```

## watch & watchEffect

## 键盘事件

## 官方风格指南

## 生命周期

## vue event 对象

## 修饰符

## 对象添加属性响应式问题（vue2 与 vue3）

## component 与 watch 的区别

## v-for - key

## vue 实例挂载过程

## vue 的理解

https://www.mianshiya.com/embed/q/1817828897648041985/combine?shareCode=j5t0zi

## class 与 style 在 vue 模板中的表示方式

- class:
  - 字符串：`<div class="red"></div>`
  - 对象：`<div :class="{ red: isRed }"></div>`
  - 数组：`<div :class="['red', 'bold']"></div>`
- style:
  - 字符串：`<div style="color: red;"></div>`
  - 对象：`<div :style="{ color: 'red' }"></div>`

## 表单修饰符

- `.lazy`: 延迟更新，直到输入框失去焦点或按下 Enter 键。
- `.number`: 自动将输入值转换为数字。
- `.trim`: 自动去除输入值首尾的空格。

## v-for 对象属性顺序

## e.target 与 e.currentTarget 的区别

- `e.target`: 触发事件的元素。
- `e.currentTarget`: 绑定事件的元素。
