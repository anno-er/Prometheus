# 200 热门

## 1. 你在项目中使用了 Vue Router 全局路由守卫,请解释一下路由守卫的概念和用法,并介绍一下它在你项目中的实际应用场景

路由守卫是 Vue Router 提供的一种导航控制机制，允许我们在路由跳转过程中进行权限控制、数据预处理等操作。它就像一道"关卡"，决定用户是否能够访问特定路由。

路由守卫主要分为三类：

1. 全局守卫：
   - beforeEach：全局前置守卫，在路由跳转前执行
   - beforeResolve：全局解析守卫，在路由解析完成后执行
   - afterEach：全局后置钩子，在路由跳转完成后执行

```javascript
  const router = new VueRouter({ ... })

  router.beforeEach((to, from, next) => {
    // to: 即将要进入的目标路由对象
    // from: 当前导航正要离开的路由对象
    // next: 用来resolve这个钩子的函数

    // 必须调用 next() 方法才能让导航继续
    // next() - 继续下一步
    // next(false) - 中断当前导航
    // next('/') 或 next({ path: '/' }) - 跳转到指定路由
    // next(error) - 中断导航并传递错误
  })
```

2. 路由独享守卫：

- beforeEnter：定义在路由配置中的守卫

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/admin",
      component: Admin,
      beforeEnter: (to, from, next) => {
        // 只对此路由生效
        next();
      },
    },
  ],
});
```

3. 组件内守卫：

- beforeRouteEnter：进入组件前调用
- beforeRouteUpdate：当前路由改变但组件被复用时调用
- beforeRouteLeave：离开组件前调用

```vue
<!-- vue 2.2.0+ -->
<script>
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {});
  },
};
</script>
<!-- vue3 -->
<script setup>
import { onBeforeRouteUpdate } from "vue-router";
onBeforeRouteUpdate((to, from) => {});
</script>
```

在项目中，路由守卫主要有以下几个实际应用场景：

1. 用户身份验证：在 beforeEach 守卫中检查用户是否已登录，如果访问需要认证的页面但未登录，则重定向到登录页。

2. 权限控制：根据不同用户角色控制页面访问权限，比如管理员才能访问某些管理页面。

3. 页面加载状态管理：在守卫中显示 loading 状态，提升用户体验。

4. 数据预加载：在跳转到某个页面前预先加载必要数据。

5. 表单保护：防止用户意外离开未保存的表单页面。

通过合理使用路由守卫，我们可以有效控制应用的导航流程，提升应用的安全性和用户体验。
