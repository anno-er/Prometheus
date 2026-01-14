# Vuex 状态管理

项目中使用 Vuex 来存储各页面或组件可能都需要获取的全局信息,比如当前登录用户信息,便于各个页面和组件之间共享这些信息,不必通过复杂的父子组件来传递数据,从而简化了项目的代码结构。

## 使用

在项目中使用 Vuex 时,需要先安装 Vuex 插件,并在 Vue 实例中使用 Vuex。

```js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
```
