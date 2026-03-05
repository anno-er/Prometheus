# Vue Router

## 1. 路由配置 404

当用户访问一个不存在的路径时，我们通常会向他们显示一个 404 Not Found 页面。在 Vue Router 中，我们可以通过通配符路由来轻松实现这一点。

这个特殊的路由规则应该被放置在路由配置数组的**最后**，以确保只有在其他所有路由都无法匹配时，它才会被触发。

**配置示例：**

```javascript
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue"; // 引入 404 页面组件

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // ... 其他路由
  {
    // 使用正则表达式匹配所有未匹配到的路径
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

在上面的示例中：

- `:pathMatch` 是一个动态段，它会捕获路径的所有部分。
- `(.*)*` 是一个正则表达式，表示匹配任何字符的任意次数。
- 当没有其他路由匹配时，这个通配符路由将捕获所有路径，并渲染 `NotFound` 组件。

## 2. 路由传参

在 Vue Router 中，我们主要通过两种方式在路由之间传递参数：`params` 和 `query`。

### 使用 `params` 传参

`params` 参数是 URL 的一部分，通常用于传递必需的、标识性的数据，例如用户 ID 或文章 ID。这种方式下的 URL 看起来更清晰、更语义化。

**路由配置：**

需要在路由配置中定义动态段，以冒号 `:` 开头。

```javascript
const routes = [
  {
    path: "/user/:id", // :id 就是一个动态段
    name: "User",
    component: User,
  },
];
```

**跳转方式：**

- **声明式 (`<router-link>`)**

  ```html
  <router-link :to="{ name: 'User', params: { id: 123 } }"
    >User 123</router-link
  >
  ```

- **编程式 (`router.push`)**

  ```javascript
  this.$router.push({ name: "User", params: { id: 123 } });
  ```

**获取参数：**

在目标组件中，通过 `$route.params.id` 来获取参数。

```javascript
export default {
  mounted() {
    console.log(this.$route.params.id); // 输出: 123
  },
};
```

> **注意：** 使用 `params` 传参时，如果提供了 `path`，则 `params` 会被忽略。因此，最好使用 `name` 来指定路由。

### 使用 `query` 传参

`query` 参数会以 `?key=value` 的形式附加在 URL 的末尾，多个 `query` 参数之间用 `&` 分隔。它通常用于传递可选的、非必需的数据，例如分页信息、筛选条件等。

**路由配置：**

`query` 传参不需要在路由配置中做任何特殊设置。

**跳转方式：**

- **声明式 (`<router-link>`)**

  ```html
  <router-link :to="{ path: '/search', query: { keyword: 'vue', page: 1 } }"
    >Search</router-link
  >
  ```

- **编程式 (`router.push`)**

  ```javascript
  this.$router.push({ path: "/search", query: { keyword: "vue", page: 1 } });
  ```

**获取参数：**

在目标组件中，通过 `$route.query` 对象来获取参数。

```javascript
export default {
  mounted() {
    console.log(this.$route.query.keyword); // 输出: 'vue'
    console.log(this.$route.query.page); // 输出: '1'
  },
};
```

## 3. 路由信息获取

在 Vue 组件中，我们可以通过 `this.$route` 对象来访问当前激活的路由的详细信息。这个对象是响应式的，包含了当前 URL 解析得到的所有信息。

### `$route` 对象的主要属性

假设我们当前的 URL 是 `http://localhost:8080/user/123?type=vip#profile`，并且对应的路由配置如下：

```javascript
{
  path: '/user/:id',
  name: 'User',
  component: User,
  meta: { requiresAuth: true }
}
```

那么在 `User` 组件内部，`this.$route` 对象将包含以下主要属性：

- **`$route.path`**:
  - 类型: `string`
  - 描述: 当前路由的路径，会被解析为绝对路径。对于上面的 URL，其值为 `'/user/123'`。

- **`$route.params`**:
  - 类型: `Object`
  - 描述: 一个包含动态片段和星号段的键/值对的对象。对于上面的 URL，其值为 `{ id: '123' }`。

- **`$route.query`**:
  - 类型: `Object`
  - 描述: 一个包含查询参数的键/值对的对象。对于上面的 URL，其值为 `{ type: 'vip' }`。

- **`$route.hash`**:
  - 类型: `string`
  - 描述: 当前路由的 hash 值 (带 `#`)。如果 hash 不存在，则为空字符串。对于上面的 URL，其值为 `'#profile'`。

- **`$route.fullPath`**:
  - 类型: `string`
  - 描述: 完成解析后的 URL，包含查询参数和 hash。对于上面的 URL，其值为 `'/user/123?type=vip#profile'`。

- **`$route.name`**:
  - 类型: `string | symbol | undefined`
  - 描述: 当前路由的名称，即在路由配置中定义的 `name` 属性。对于上面的路由，其值为 `'User'`。

- **`$route.meta`**:
  - 类型: `Object`
  - 描述: 路由元信息，一个包含了在路由配置中定义的 `meta` 字段的对象。对于上面的路由，其值为 `{ requiresAuth: true }`。

### 在模板中使用

你也可以直接在模板中访问 `$route` 对象：

```html
<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ $route.params.id }}</p>
    <p>User Type: {{ $route.query.type }}</p>
  </div>
</template>
```

### 组合式 API (Composition API)

在 Vue 3 的组合式 API 中，你需要使用 `useRoute` 函数来获取当前的路由对象。

```javascript
import { useRoute } from "vue-router";
import { onMounted } from "vue";

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      console.log(route.params.id);
    });
  },
};
```

## 4. hash 模式与 history 模式

Vue Router 支持两种路由模式：`hash` 模式和 `history` 模式。它们决定了 URL 的外观以及与服务器的交互方式。

### Hash 模式 (默认)

- **URL 形式**: `http://localhost:8080/#/user/123`
- **原理**:
  - `hash` 模式利用了 URL 中的 hash（`#`）部分。`#` 后面的路径变化不会被发送到服务器。
  - 浏览器通过 `window.onhashchange` 事件来监听 hash 的变化，从而触发前端路由的切换。
- **优点**:
  - **兼容性好**: 可以在所有支持 URL hash 的浏览器中运行，包括一些旧版浏览器。
  - **无需后端配置**: 由于 URL 的 hash 部分不会包含在 HTTP 请求中，因此不需要对后端服务器进行任何特殊配置。刷新页面或直接访问带 hash 的 URL 都能正常工作。
- **缺点**:
  - **URL 不美观**: URL 中总是带有一个 `#`，对于追求美观的 URL 来说可能不是最佳选择。

**配置方式 (Vue Router 4.x):**

```javascript
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...],
});
```

### History 模式

- **URL 形式**: `http://localhost:8080/user/123`
- **原理**:
  - `history` 模式利用了 HTML5 History API 中的 `pushState()` 和 `replaceState()` 方法，这些方法可以改变浏览器的 URL 而不刷新页面。
  - 浏览器通过 `window.onpopstate` 事件来监听 URL 的变化（例如，用户点击浏览器的前进/后退按钮）。
- **优点**:
  - **URL 美观**: URL 看起来就像传统的后端路由一样，没有 `#`。
- **缺点**:
  - **需要后端配置**: 当用户刷新页面或直接访问一个深层链接（如 `http://localhost:8080/user/123`）时，浏览器会向服务器发送一个对该路径的 GET 请求。如果后端没有配置将所有这类请求都指向你的单页面应用的 `index.html`，服务器就会返回 404 错误。

**配置方式 (Vue Router 4.x):**

```javascript
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [...],
});
```

**后端配置示例 (Nginx):**

为了让 `history` 模式正常工作，你需要在你的服务器上添加一个“兜底”的路由规则。对于 Nginx，配置可能如下：

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

这个配置告诉 Nginx，对于任何进来的请求，首先尝试匹配一个文件 (`$uri`)，然后尝试匹配一个目录 (`$uri/`)，如果都失败了，就返回 `/index.html` 文件。这样，你的 Vue 应用就可以接管路由，并显示正确的页面。

### 总结对比

| 特性         | Hash 模式           | History 模式                                                  |
| :----------- | :------------------ | :------------------------------------------------------------ |
| **URL 外观** | 带 `#`，不美观      | 不带 `#`，美观                                                |
| **后端配置** | 无需配置            | 需要配置“兜底”路由                                            |
| **原理**     | `onhashchange` 事件 | HTML5 History API (`pushState`, `replaceState`, `onpopstate`) |
| **兼容性**   | 更好                | 依赖 HTML5 API，不兼容旧版浏览器                              |

## 5. router-link

`<router-link>` 是 Vue Router 提供的用于声明式导航的组件。它在 DOM 中最终会被渲染成一个 `<a>` 标签，但它提供了比普通 `<a>` 标签更强大的功能，能够智能地处理路由导航。

### 主要 Props

- **`to`** (必需)
  - 类型: `string | object`
  - 描述: 定义导航的目标路由。它可以是一个字符串路径，也可以是一个描述目标位置的对象。

    ```html
    <!-- 字符串 -->
    <router-link to="/about">About</router-link>

    <!-- 对象 -->
    <router-link :to="{ name: 'user', params: { id: 123 } }">User</router-link>

    <!-- 带查询参数 -->
    <router-link :to="{ path: '/register', query: { plan: 'private' } }"
      >Register</router-link
    >
    ```

- **`replace`**
  - 类型: `boolean`
  - 描述: 如果设置为 `true`，导航将不会留下历史记录。这意味着用户无法通过浏览器的“后退”按钮返回到上一个页面。这在功能上等同于调用 `router.replace()`。

    ```html
    <router-link to="/submit" replace>Submit</router-link>
    ```

- **`tag`** (Vue 2.x, 在 Vue 3.x 中已废弃)
  - 类型: `string`
  - 描述: 在 Vue 2.x 中，你可以使用 `tag` prop 来指定 `<router-link>` 渲染成哪种 HTML 标签。在 Vue 3.x 中，这个功能被 `v-slot` API 取代。

- **`active-class`**
  - 类型: `string`
  - 描述: 当链接处于“激活”状态时（即当前路由与该链接匹配），这个 CSS 类名会被应用到渲染的 `<a>` 标签上。默认值是 `"router-link-active"`。

- **`exact-active-class`**
  - 类型: `string`
  - 描述: 当链接处于“精确激活”状态时（即当前路由与该链接完全匹配），这个 CSS 类名会被应用。默认值是 `"router-link-exact-active"`。

### 使用 `v-slot` 自定义内容 (Vue 3.x)

在 Vue 3.x 中，你可以使用 `v-slot` API 来完全控制 `<router-link>` 的渲染内容，包括自定义触发导航的元素和样式。

```html
<router-link
  to="/about"
  custom
  v-slot="{ href, route, navigate, isActive, isExactActive }"
>
  <a
    :href="href"
    @click="navigate"
    :class="{ 'active-link': isActive, 'exact-active-link': isExactActive }"
  >
    {{ route.fullPath }}
  </a>
</router-link>
```

在这个例子中：

- `custom` prop 告诉 `<router-link>` 不要渲染它自己的 `<a>` 标签。
- `v-slot` 提供了一些有用的属性，如：
  - `href`: 解析后的 URL。
  - `navigate`: 触发导航的函数。
  - `isActive`: 链接是否处于激活状态。
  - `isExactActive`: 链接是否处于精确激活状态。

这给了我们极大的灵活性，例如，我们可以将导航功能附加到按钮或其他任何元素上。

## 6. router-view

`<router-view>` 组件是 Vue Router 中最核心的组件之一。它作为一个占位符，用于渲染与当前 URL 匹配的路由组件。

### 基本用法

在你的应用组件中，你只需要在你希望展示路由内容的地方放置一个 `<router-view>` 标签即可。

```html
<!-- App.vue -->
<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </header>
    <main>
      <!-- 路由匹配到的组件将在这里渲染 -->
      <router-view></router-view>
    </main>
  </div>
</template>
```

### 结合 `<transition>` 实现过渡效果

你可以用 `<transition>` 组件包裹 `<router-view>`，为路由切换添加动态的过渡效果。

```html
<router-view v-slot="{ Component }">
  <transition name="fade" mode="out-in">
    <component :is="Component" />
  </transition>
</router-view>
```

在这个例子中：

- 我们使用了 `v-slot` API 来获取当前路由的组件 (`Component`)。
- `<transition>` 组件包裹了动态的 `<component>`，并设置了 `name` 和 `mode`。
- 你需要定义相应的 CSS 过渡类（如 `.fade-enter-active`, `.fade-leave-active`）来实现动画效果。

### 具名视图 (Named Views)

有时候，你可能需要在一个页面上同时显示多个视图，而不是简单地嵌套。例如，一个包含侧边栏 `Sidebar` 和主内容区 `Main` 的布局。这时，你可以使用具名视图。

你可以在同一个组件中定义多个 `<router-view>`，并为它们命名。

```html
<template>
  <div>
    <router-view name="sidebar"></router-view>
    <router-view></router-view>
    <!-- 默认视图 -->
  </div>
</template>
```

然后，在你的路由配置中，你可以为每个具名视图指定要渲染的组件。

```javascript
const routes = [
  {
    path: "/",
    components: {
      // 注意这里是 components (复数)
      default: Home, // 对应未命名的 router-view
      sidebar: Sidebar, // 对应 name="sidebar" 的 router-view
    },
  },
];
```

这样，当用户访问根路径 `/` 时，`Home` 组件会渲染在默认的 `<router-view>` 中，而 `Sidebar` 组件会渲染在名为 `sidebar` 的 `<router-view>` 中。

## 7. Vue 前端路由概念

前端路由是现代单页面应用（SPA, Single Page Application）的基石。与传统的后端路由不同，前端路由在客户端（浏览器）层面处理 URL 与视图之间的映射关系，而无需每次都向服务器请求新的 HTML 页面。

### 后端路由 (传统多页面应用)

在传统的多页面应用 (MPA) 中，路由由后端服务器控制。当用户点击一个链接或在地址栏输入一个新的 URL 时：

1.  浏览器向服务器发送一个 HTTP 请求。
2.  服务器根据请求的 URL 路径，找到对应的处理逻辑，并生成一个全新的 HTML 页面。
3.  服务器将这个 HTML 页面发送回浏览器。
4.  浏览器接收并完全重新加载页面。

这种模式的缺点是每次页面切换都会导致整个页面的刷新，用户体验相对较差，服务器压力也更大。

### 前端路由 (单页面应用)

在单页面应用 (SPA) 中，整个应用只在初始时加载一个 HTML 页面。当 URL 发生变化时：

1.  前端路由库（如 Vue Router）会拦截这个变化。
2.  它并不会向服务器发送新的请求，而是在客户端通过 JavaScript 动态地查找与新 URL 匹配的组件。
3.  然后，它将这个组件渲染到页面上预先定义好的区域（即 `<router-view>`）。

这个过程完全在客户端完成，页面不会整体刷新，只是内容区域发生了更新。这带来了类似桌面应用的流畅体验。

### 核心思想

前端路由的核心思想是：**监听 URL 的变化，并根据这个变化来动态地渲染不同的视图（组件）**。

- 在 **hash 模式**下，路由库监听 URL hash 部分（`#` 之后的内容）的变化。
- 在 **history 模式**下，路由库利用 HTML5 History API（`pushState` 和 `replaceState`）来改变 URL，并监听浏览器的前进/后退事件。

通过这种方式，前端路由实现了 URL 与 UI 状态的同步，让用户可以通过 URL 来定位到应用中的特定视图，同时也支持了浏览器的前进、后退和书签功能。

> 想要更深入地了解前端路由的实现原理，可以参考这篇文章：[前端路由实现原理](https://www.mianshiya.com/embed/q/1817828899631947778/combine?shareCode=j5t0zi)

## 8. 路由跳转方式

在 Vue Router 中，实现页面间的跳转主要有两种方式：**声明式导航**和**编程式导航**。

### 1. 声明式导航: `<router-link>`

这是最基本和常用的导航方式。我们通过 `<router-link>` 组件来创建一个链接，它会被渲染成一个 `<a>` 标签。

- **优点**: 使用简单直观，语义明确，并且会自动处理激活状态的 CSS 类名。
- **适用场景**: 用于常规的用户点击导航，如菜单栏、面包屑、链接列表等。

**示例：**

```html
<!-- 字符串路径 -->
<router-link to="/about">About</router-link>

<!-- 命名的路由，并附带 params 参数 -->
<router-link :to="{ name: 'user', params: { id: 123 } }"
  >Go to User</router-link
>

<!-- 带 query 参数 -->
<router-link :to="{ path: '/search', query: { q: 'vue' } }"
  >Search for Vue</router-link
>
```

### 2. 编程式导航: `router` 实例方法

编程式导航是指通过调用 `router` 实例上的方法来实现路由的跳转。这给了我们在 JavaScript 逻辑中控制导航的能力。

- **优点**: 可以在任何业务逻辑执行完毕后（例如，表单提交成功后、异步数据获取后）触发导航。
- **适用场景**: 需要在特定事件或逻辑流程中进行页面跳转的场景。

在组件内部，你可以通过 `this.$router` (选项式 API) 或 `useRouter()` (组合式 API) 来访问 `router` 实例。

#### `router.push(location, onComplete?, onAbort?)`

- **作用**: 向 history 栈添加一个新的记录，然后导航到该位置。用户点击浏览器“后退”按钮时，可以返回到之前的页面。
- **这是最常用的编程式导航方法。**

```javascript
// 字符串路径
this.$router.push("/home");

// 对象路径
this.$router.push({ path: "/home" });

// 命名的路由
this.$router.push({ name: "user", params: { id: "123" } });

// 带查询参数
this.$router.push({ path: "/register", query: { plan: "private" } });
```

#### `router.replace(location, onComplete?, onAbort?)`

- **作用**: 导航到新的位置，但**不会**向 history 栈添加新记录，而是直接**替换**当前记录。
- **使用场景**: 在某些不希望用户能够返回的场景，如登录成功后跳转到主页，或经过一系列引导步骤后的最终页面。

```javascript
// 登录成功后，替换当前登录页，跳转到 dashboard
this.$router.replace({ name: "Dashboard" });
```

#### `router.go(n)`

- **作用**: 在 history 记录中向前或向后移动。参数 `n` 是一个整数，表示移动的步数。

```javascript
// 在 history 记录中向前移动 1 步，等同于 router.forward()
this.$router.go(1);

// 向后回退 1 步，等同于 router.back()
this.$router.go(-1);

// 向前移动 3 步
this.$router.go(3);

// 如果 history 记录不够，导航将失败
this.$router.go(-100);
```

#### `router.back()`

- **作用**: 相当于 `router.go(-1)`，在 history 记录中向后移动一步。

#### `router.forward()`

- **作用**: 相当于 `router.go(1)`，在 history 记录中向前移动一步。

## 9. route 与 router

在 Vue Router 中，`$route` 和 `$router` 是两个核心对象，它们在功能和用途上有本质的区别。理解它们的差异对于正确使用 Vue Router 至关重要。

### `$route` (或 `useRoute`)

- **是什么**: `$route` 是一个**路由信息对象**。
- **包含内容**: 它包含了当前激活的路由的**所有信息**，例如路径 (`path`)、URL 参数 (`params`)、查询参数 (`query`)、路由名称 (`name`)、元信息 (`meta`) 等。
- **特点**:
  - **只读的**: 你应该将 `$route` 对象视为一个不可变对象。它的属性会随着 URL 的变化而响应式地更新，但你不应该手动去修改它。
  - **每个组件独享**: 每个组件内部访问的 `$route` 对象都是当前路由的信息，但它们是独立的实例。
- **如何访问**:
  - **选项式 API**: `this.$route`
  - **组合式 API**: `import { useRoute } from 'vue-router'; const route = useRoute();`
- **用途**: 主要用于**获取**当前路由的状态和信息，以便在组件中渲染内容或执行逻辑。

**简单来说，`$route` 是关于“在哪里”的信息。**

```javascript
// 在组件中获取当前用户的 ID
export default {
  mounted() {
    const userId = this.$route.params.id;
    console.log(`当前用户 ID 是: ${userId}`);
  },
};
```

### `$router` (或 `useRouter`)

- **是什么**: `$router` 是 Vue Router 的**导航路由器实例**。
- **包含内容**: 它包含了整个应用的路由配置，并提供了一系列用于**控制导航**的方法，如 `push()`、`replace()`、`go()`、`back()` 等。
- **特点**:
  - **可操作的**: 你可以使用 `$router` 对象的方法来编程式地改变 URL，从而实现页面跳转。
  - **全局唯一**: 在整个 Vue 应用中，只有一个 `$router` 实例。
- **如何访问**:
  - **选项式 API**: `this.$router`
  - **组合式 API**: `import { useRouter } from 'vue-router'; const router = useRouter();`
- **用途**: 主要用于**执行**导航操作，即“去哪里”。

**简单来说，`$router` 是用于“怎么去”的工具。**

```javascript
// 在某个方法中，编程式地跳转到 about 页面
export default {
  methods: {
    goToAbout() {
      this.$router.push("/about");
    },
  },
};
```

### 总结对比

| 特性              | `$route`                                  | `$router`                                            |
| :---------------- | :---------------------------------------- | :--------------------------------------------------- |
| **本质**          | 路由信息对象 (Route Information Object)   | 路由器实例 (Router Instance)                         |
| **角色**          | “信息员”，提供当前路由的数据              | “导航员”，提供导航控制方法                           |
| **数据流**        | **获取**信息 (只读)                       | **执行**动作 (可写)                                  |
| **作用域**        | 组件级别                                  | 全局唯一                                             |
| **常用属性/方法** | `path`, `params`, `query`, `name`, `meta` | `push()`, `replace()`, `go()`, `back()`, `forward()` |

## 10. params 与 query

`params` 和 `query` 是 Vue Router 中用于在路由间传递数据的两种主要方式。它们在 URL 的表现形式、使用场景和配置方式上有所不同。

### 主要区别对比

| 特性         | `params`                                               | `query`                                                      |
| :----------- | :----------------------------------------------------- | :----------------------------------------------------------- |
| **URL 表现** | 作为 URL 路径的一部分，例如 `/user/123`                | 以 `?` 开头，附加在 URL 路径之后，例如 `/search?keyword=vue` |
| **语义**     | 通常用于传递**唯一标识**或**必需**的参数，如 ID        | 通常用于传递**可选**参数，如筛选条件、分页信息等             |
| **配置**     | 需要在路由配置中显式定义动态段，如 `path: '/user/:id'` | 无需任何特殊配置                                             |
| **传参方式** | 只能与 `name` 配合使用，不能与 `path` 同时使用         | 可以与 `path` 或 `name` 配合使用                             |
| **数据类型** | 参数值会被编码为字符串                                 | 参数值会被编码为字符串                                       |
| **刷新页面** | 参数**保留**在 URL 中，刷新后依然存在                  | 参数**保留**在 URL 中，刷新后依然存在                        |
| **获取方式** | `this.$route.params`                                   | `this.$route.query`                                          |

### 使用场景与示例

#### `params`: 适用于需要将参数作为 URL 一部分的场景

想象一个场景，你需要显示特定用户的个人资料页面。使用 `params` 是最合适的，因为它能生成一个清晰、语义化的 URL。

- **路由配置**:
  ```javascript
  { path: '/user/:id', name: 'user', component: UserProfile }
  ```
- **跳转**:
  ```javascript
  // 导航到 /user/456
  this.$router.push({ name: "user", params: { id: 456 } });
  ```
- **URL**: `http://example.com/user/456`
- **优点**: URL 结构清晰，符合 RESTful 风格。

> **重要提示**: 如果你使用 `path` 来进行 `params` 传参，`params` 的值将会被忽略。所以，**始终使用 `name` 来配合 `params`**。

#### `query`: 适用于需要传递查询条件的场景

想象一个搜索页面，用户可以输入关键词并选择页码。`query` 在这里非常适用。

- **路由配置**:
  ```javascript
  { path: '/search', name: 'search', component: SearchResults }
  ```
- **跳转**:
  ```javascript
  // 导航到 /search?q=vue-router&page=2
  this.$router.push({ name: "search", query: { q: "vue-router", page: 2 } });
  ```
- **URL**: `http://example.com/search?q=vue-router&page=2`
- **优点**: 非常适合传递多个、可选的参数，且不影响核心的 URL 结构。

### 总结

- 当参数是**数据实体的唯一标识**（如用户 ID、文章 ID）时，优先使用 `params`。
- 当参数是**可选的查询条件**（如排序方式、筛选条件、当前页码）时，优先使用 `query`。
- `params` 的参数是 URL 结构的一部分，而 `query` 的参数是附加信息。
