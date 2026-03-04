# Sass/SCSS 全面指南

> 适用于前端开发者的系统性笔记：覆盖语法、模块、函数、工程集成与最佳实践。示例使用 SCSS 语法，并包含中文注释。

## 目录

- 基础概念与语法差异
- 变量与插值
- 嵌套与父选择器
- 占位选择器与继承
- Mixin 与函数
- 控制指令（条件、循环）
- 模块系统：@use/@forward 与 @import 的区别
- 数据结构：列表与映射（map）
- 内置模块与常用函数
- 媒体查询与响应式工具
- 主题与设计系统
- 选择器与结构控制：@at-root、selector 函数
- 计算与单位
- 调试与错误处理
- 项目组织与部分文件（partials）
- 最佳实践与常见坑
- 编译与集成（CLI、构建工具）

---

## 基础概念与语法差异

- Sass 是 CSS 的预处理器，提供变量、嵌套、函数、模块等特性，最终编译为纯 CSS。
- 两种语法：
  - SCSS：以分号与大括号为主，完全兼容 CSS（推荐）。
  - Sass（缩进式）：无分号，无大括号，靠缩进表示层级。
- 文件扩展名：
  - `.scss`：SCSS 语法
  - `.sass`：缩进式语法

```scss
// SCSS 示例（推荐）：
$primary: #0ea5e9; // 变量

.btn {
  color: #fff;
  background: $primary;
  &:hover {
    // 使用父选择器 &
    background: darken($primary, 10%); // 使用颜色函数
  }
}
```

---

## 变量与插值

- 使用 `$name: value` 定义变量，作用域遵循模块与局部规则。
- 插值：`#{$var}` 可将变量值拼接进选择器、属性名或字符串。

```scss
$space: 8px;
$brand: "acme";
$theme-color: #1f2937; // slate-800

.card {
  margin: $space; // 直接使用变量
  border: 1px solid $theme-color;
}

.logo-#{$brand} {
  // 插值到选择器名称
  // 生成 .logo-acme
  width: 120px;
}

$prop: "border-radius";
.pill {
  #{ $prop }: 9999px; // 插值到属性名
}
```

---

## 嵌套与父选择器

- 将层级结构用嵌套表达，避免重复书写选择器。
- `&` 引用当前选择器，常用于伪类、伪元素或 BEM 修饰。

```scss
.btn {
  padding: 0.5rem 1rem;
  &--primary {
    // BEM 修饰
    background: #0ea5e9;
    color: #fff;
  }
  &:hover {
    // 伪类
    filter: brightness(1.05);
  }
  &::before {
    // 伪元素
    content: "";
    display: inline-block;
  }
}

.menu {
  li {
    // 生成 .menu li
    list-style: none;
    a {
      // 生成 .menu li a
      color: #334155;
    }
  }
}
```

---

## 占位选择器与继承

- 占位选择器 `%name` 不会直接输出到 CSS，需要通过 `@extend` 使用。
- `@extend` 将选择器合并，减少重复；但要注意选择器爆炸与跨媒体查询的限制。

```scss
%btn-base {
  // 占位：不直接输出
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
}

.btn-primary {
  @extend %btn-base; // 继承占位样式
  background: #0ea5e9;
  color: #fff;
}

// 注意：不要在不同媒体查询间交叉使用 @extend，以免选择器合并异常
```

---

## Mixin 与函数

- Mixin：复用一段样式，可带参数和默认值；支持可变参数与关键字参数。
- 函数：返回计算值，用于生成属性值。

```scss
// 带默认值与关键字参数的 mixin
@mixin ring($color: rgba(0, 0, 0, 0.1), $spread: 2px) {
  // 通用 focus ring
  outline: 2px solid $color;
  outline-offset: $spread;
}

.input {
  @include ring($color: rgba(14, 165, 233, 0.4)); // 关键字参数
}

// 可变参数 mixin
@mixin flex-center($gap: 0, $args...) {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $gap;
  // 可在此处理 $args，作为扩展配置
}

.avatar {
  @include flex-center(0.5rem);
}

// 函数：返回计算值
@function px-to-rem($px, $base: 16px) {
  @return ($px / $base) * 1rem; // 单位计算
}

.title {
  font-size: px-to-rem(24px); // 1.5rem
}
```

---

## 控制指令（条件、循环）

- `@if / @else if / @else` 条件判断。
- `@for` 支持 `from ... through`（包含终值）与 `from ... to`（不包含终值）。
- `@each` 遍历列表或映射。
- `@while` 条件循环（较少用）。

```scss
$debug: false;

@if $debug == true {
  // 仅在调试时输出
  .debug {
    outline: 1px dashed red;
  }
} @else {
  // 生产环境不输出
}

// 生成多段尺寸工具类
@for $i from 1 through 5 {
  .mt-#{$i} {
    margin-top: $i * 4px;
  }
}

// 遍历映射生成颜色类
$colors: (
  primary: #0ea5e9,
  success: #10b981,
  danger: #ef4444,
);

@each $name, $val in $colors {
  .text-#{$name} {
    color: $val;
  }
  .bg-#{$name} {
    background-color: $val;
  }
}
```

---

## 模块系统：@use/@forward 与 @import

- 现代 Sass 推荐使用 `@use` 与 `@forward`，`@import` 已废弃。
- `@use` 会创建命名空间，默认是文件名；可用 `as` 改名或 `as *` 展开（不推荐）。
- `@forward` 用于转发导出供其他模块使用；可结合 `show`/`hide` 控制暴露的符号。
- `with` 可在引入时配置变量（相当于模块的可配置参数）。

```scss
// _variables.scss（partial 文件，以下划线开头不直接编译）
$primary: #0ea5e9 !default; // !default 允许被 with 覆盖
$radius: 8px !default;

// _theme.scss
@forward "variables" show $primary, $radius; // 只暴露指定变量

// styles.scss
@use "theme" with (
  $primary: #22c55e // 用 with 覆盖默认值
);

.btn {
  // 命名空间访问：theme.$primary
  background: theme.$primary;
  border-radius: theme.$radius;
}
```

---

## 数据结构：列表与映射（map）

- 列表：用空格或逗号分隔，支持 `nth()`、`join()`、`append()` 等。
- 映射：键值对结构，用 `()` 包裹，支持 `map-get()`、`map-merge()`、`map-remove()`。

```scss
$spacings: 0 4px 8px 12px 16px; // 列表
$palette: (
  primary: #0ea5e9,
  neutral: #64748b,
); // 映射

.box {
  margin: nth($spacings, 3); // 8px
  color: map-get($palette, primary);
}

// 合并映射
$palette: map-merge(
  $palette,
  (
    accent: #a855f7,
  )
);

// 生成工具类
@each $i, $val in $spacings {
  .p-#{$i} {
    padding: $val;
  } // 列表遍历的索引与值
}
```

---

## 内置模块与常用函数

- `sass:color`：`lighten`/`darken`/`mix`/`adjust-hue`/`scale-color` 等。
- `sass:math`：`round`/`ceil`/`floor`/`max`/`min`，以及加减乘除。
- `sass:list`、`sass:map`：列表与映射操作。
- `sass:selector`：选择器组合、嵌套解析。
- `sass:string`：字符串拼接、查找、替换。

```scss
@use "sass:color";
@use "sass:math";

$base: #0ea5e9;
.btn {
  background: color.scale($base, $lightness: -10%); // 在原色基础上调整
  border-color: color.mix($base, #000, 20%); // 与黑色混合 20%
  letter-spacing: math.round(0.045rem); // 四舍五入
}
```

---

## 媒体查询与响应式工具

- 借助 mixin 管理断点，统一响应式策略。
- 注意单位与移动优先设计。

```scss
// 断点定义
$breakpoints: (
  sm: 640px,
  md: 768px,
  lg: 1024px,
  xl: 1280px,
);

@mixin bp($name) {
  $size: map-get($breakpoints, $name);
  @media (min-width: $size) {
    @content; // 插入调用方内容
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  @include bp(md) {
    grid-template-columns: 1fr 1fr;
  } // ≥768px 两列
  @include bp(lg) {
    grid-template-columns: 1fr 1fr 1fr;
  } // ≥1024px 三列
}
```

---

## 主题与设计系统

- 用映射管理主题色与语义色，通过 `@each` 生成变量或类。
- 提供 `with` 配置以在不同项目中可定制。

```scss
// _tokens.scss
$tokens: (
  color: (
    primary: #0ea5e9,
    success: #10b981,
    warning: #f59e0b,
    danger: #ef4444,
  ),
  radius: (
    sm: 4px,
    md: 8px,
    lg: 12px,
  ),
);

// 生成语义类
@each $name, $val in map-get($tokens, color) {
  .text-#{$name} {
    color: $val;
  }
  .bg-#{$name} {
    background: $val;
  }
}

// 使用半径
.card {
  border-radius: map-get(map-get($tokens, radius), md);
}
```

---

## 选择器与结构控制：@at-root、selector 函数

- `@at-root` 将嵌套内容提升到根级，避免不必要的嵌套。
- `sass:selector` 模块可进行选择器拼装与解析。

```scss
.wrap {
  &__item {
    // 默认会输出 .wrap__item 规则
    @at-root .is-open & {
      // 输出到根级选择器 ".is-open .wrap__item"
      display: block;
    }
  }
}
```

---

## 计算与单位

- 算术遵循单位规则，建议使用 `sass:math` 显式运算。
- 比例与尺寸转换应统一以基准单位计算（如 16px→1rem）。

```scss
@use "sass:math";

$base: 16px;
.text-lg {
  font-size: math.div(20px, $base) * 1rem;
} // 1.25rem
.space {
  margin: math.div(24px, $base) * 1rem;
} // 1.5rem
```

---

## 调试与错误处理

- `@debug` 输出当前值（编译时可见，不进入最终 CSS）。
- `@warn` 打印警告，不阻断编译。
- `@error` 终止编译并输出错误信息。

```scss
$radius: -4px;
@debug $radius; // 编译时输出：-4px

@if $radius < 0 {
  @warn "radius 应为非负数，已强制改为 0"; // 打印警告
  $radius: 0;
}

@function safe-radius($r) {
  @if $r < 0 {
    @error "radius 不能为负数";
  } // 终止编译
  @return $r;
}
```

---

## 项目组织与部分文件（partials）

- 约定以下划线开头的文件为部分文件（partial），不会单独编译。
- 将变量、mixin、函数、基础样式拆分为多个 partial，并通过 `@use` 聚合。

```
styles/
  _variables.scss
  _mixins.scss
  _functions.scss
  _base.scss
  app.scss        // 入口：@use 上述 partials
```

```scss
// app.scss
@use "variables";
@use "mixins";
@use "base";
```

---

## 最佳实践与常见坑

- 控制嵌套深度（建议 ≤3 层），避免选择器复杂度过高。
- 优先使用 `@use/@forward`，弃用 `@import`。
- 谨慎使用 `@extend`，避免跨媒体查询与跨上下文合并导致选择器爆炸。
- 变量与 tokens 统一来源，避免在组件内到处定义魔法值。
- 函数返回纯值，mixin 输出样式；区分数据与样式复用场景。
- 编译前尽量在 Sass 层做完计算，输出稳定 CSS。

---

## 编译与集成（CLI、构建工具）

- 推荐使用 Dart Sass（官方实现）。
- CLI 示例（全局安装或项目内脚本均可）：

```bash
sass --version
sass src/styles/app.scss public/app.css  # 编译单文件
sass --watch src/styles:public/styles    # 目录监听编译
```

- 构建工具常见集成（示意）：
  - Webpack：sass-loader + css-loader + style-loader
  - Vite/Rollup：内置或插件支持 SCSS 预处理

```scss
// 在组件样式中直接使用 SCSS 语法
$accent: #a855f7;
.link {
  color: $accent;
  &:hover {
    color: lighten($accent, 8%);
  } // 颜色函数
}
```

---

## 综合示例：BEM + 响应式 + 主题色

```scss
@use "sass:color";

$palette: (
  primary: #0ea5e9,
  neutral: #64748b,
);

@mixin btn($tone: primary) {
  $bg: map-get($palette, $tone);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: #fff;
  background: $bg;
  &:hover {
    background: color.scale($bg, $lightness: -8%);
  } // hover 变暗
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.btn {
  &--primary {
    @include btn(primary);
  } // BEM 修饰
  &--neutral {
    @include btn(neutral);
  }
}

.btn__icon {
  // 通过父选择器生成更具体样式
  .btn--primary & {
    filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.2));
  }
}
```

---

## 参考要点速查

- SCSS 语法兼容 CSS；模块优先 `@use/@forward`。
- 变量 `$`、插值 `#{}`、父选择器 `&`、占位 `%`、`@extend`。
- 复用：`@mixin` 输出样式，`@function` 返回值。
- 流程：`@if/@for/@each/@while`；根级控制 `@at-root`。
- 数据：列表/映射，`sass:list`/`sass:map` 操作。
- 颜色与数学：`sass:color`、`sass:math`。
- 调试：`@debug/@warn/@error`。

---

以上内容覆盖 Sass/SCSS 的核心与工程实践，适合在项目中直接作为知识与示例参考。
