# Less 全面知识点与实践指南

## 概述

- Less 是一门 CSS 预处理语言，提供变量、嵌套、运算、函数、条件与复用能力，最终编译为标准 CSS。
- 优点：提高样式可维护性、支持主题化与设计令牌、减少重复、构建复杂体系时更清晰。
- 与 Sass 的差异：语法更接近原生 CSS，浏览器可直接运行 less.js；生态以 less-loader 等为主。

## 安装与编译

### 命令行工具

```cmd
npm install -g less
lessc styles\main.less public\css\main.css
lessc --source-map styles\main.less public\css\main.css
```

- 生产环境优先使用预编译，不建议在浏览器用 less.js 运行时编译。

### 常见构建集成

- Webpack：使用 less-loader，将 Less 转译为 CSS，再配合 css-loader、style-loader 或 MiniCssExtractPlugin。
- Vite/Rollup/Parcel：在样式管线里启用 Less 支持，保持与 PostCSS、Autoprefixer 协同。

## 语法基础

### 变量

```less
@primary: #4e7cf2;
@spacing: 8px;
@font: "Inter", "Segoe UI", Arial, sans-serif;

.button {
  color: #fff;
  background: @primary;
  padding: @spacing @spacing * 2;
  font-family: @font;
}
```

### 选择器嵌套与父选择器引用

```less
.card {
  display: grid;
  gap: @spacing;
  &-title {
    font-weight: 600;
  }
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  & + & {
    margin-top: @spacing;
  }
}
```

### 插值（Selector 与属性名）

```less
@name: btn;
@prop: background;

.@{name} {
  @{prop}: @primary;
}
```

### 运算与单位

```less
.box {
  width: 100px + 2rem;
  height: (200px / 2);
  margin: @spacing * 3;
}
@w: unit(12, px);
@p: percentage(0.15);
@r: round(12.678px, 1);
```

## Mixins（复用）

### 基础与参数化

```less
// 边框圆角复用：传入半径，生成 border-radius
.border-radius(@r) {
  border-radius: @r;
}

// 按钮基础样式：@bg 为背景色，@fg 默认为 #fff；包含内边距与圆角
.button-base(@bg, @fg: #fff) {
  background: @bg;
  color: @fg;
  padding: @spacing @spacing * 2;
  border-radius: 6px;
}

// 生成主按钮样式，复用 .button-base 并传入主题主色
.primary-btn {
  .button-base(@primary);
}
```

### Guard（条件）与类型判断

```less
// size：仅当 @n > 0 时生效，按 10px 倍数设置宽度
.size(@n) when (@n > 0) {
  width: @n * 10px;
}
// tint：仅当传入的是颜色值时生效，设置背景颜色
.tint(@c) when (iscolor(@c)) {
  background: @c;
}
// 示例：n=3 -> width: 30px
.size(3);
// 示例：传入 #333 设置背景
.tint(#333);
```

### 命名空间

```less
#util {
  .clearfix() {
    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }
}
.panel {
  #util.clearfix();
}
```

## 扩展（extend）

```less
.message {
  padding: @spacing;
  border: 1px solid #ddd;
  border-radius: 6px;
}
.info:extend(.message) {
  border-color: @primary;
}
```

## 常用函数库

### 判断

```less
- iscolor(@c)：判断是否为颜色值。
- isnumber(@n)：判断是否为数值。
- isstring(@s)：判断是否为字符串。
- iskeyword(@k)：判断是否为 Less 关键字。
- isurl(@u)：判断是否为 URL。
```

### 颜色操作

- spin：色相旋转，用于强调配色。
- lighten：提亮颜色，用于 hover 状态。
- desaturate：去饱和颜色，更柔和。
- mix：按比例混合两种颜色。
- fade：设置颜色透明度，较高不透明度。
- grayscale：将颜色转换为灰度。

```less
// accent：色相旋转 10°，用于强调配色
@accent: spin(@primary, 10);
// hover：主色提亮 10%，用于 hover 状态
@hover: lighten(@primary, 10%);
// muted：主色去饱和 30%，更柔和
@muted: desaturate(@primary, 30%);
// blend：按 20% 黑 + 80% 白混合得到浅灰
@blend: mix(#000, #fff, 20%);
// soft：将主色 alpha 设为 80%，较高不透明度
@soft: fade(@primary, 80%);
// gray：主色灰度化
@gray: grayscale(@primary);
```

### 数值与单位

- unit：将数值转换为指定单位，如 unit(24, px)。
- percentage：将小数转换为百分比，如 percentage(0.2)。
- round：四舍五入到指定小数位，如 round(3.14159, 2)。
- ceil：向上取整，如 ceil(12.01)。
- floor：向下取整，如 floor(12.99)。

```less
// px：将 24 转换为 px 单位
@px: unit(24, px);
// pct：将 0.2 转换为 20%
@pct: percentage(0.2);
// round2：四舍五入保留 2 位小数
@round2: round(3.14159, 2);
// ceilv：向上取整
@ceilv: ceil(12.01);
// floorv：向下取整
@floorv: floor(12.99);
```

### 字符串与转义

```less
// calc：使用 e() 原样输出 calc 表达式，避免 Less 误解析
@calc: e("calc(100% - 2rem)");
.box {
  // 在 .box 中引用变量设置宽度
  width: @calc;
}
```

## 列表与访问

//extract() 函数接受一个列表和一个索引值作为参数，返回列表中指定位置（索引）的元素

```less
@list: 10px, 12px, 16px, 24px;
@len: length(@list);
@third: extract(@list, 3);
.spacing {
  margin: @third;
}
```

## Detached Rulesets（规则集变量）

```less
@theme: {
  color: @primary;
  background: #fff;
};
.card {
  @theme();
}
```

## 导入（Import）与选项

```less
@import "base.less";
@import (reference) "lib.less";
@import (inline) "raw.css";
@import (less) "tokens.less";
@import (css) "reset.css";
@import (once) "forms.less";
@import (multiple) "forms.less";
@import (optional) "missing.less";
```

- reference：不直接输出被导入内容，需被 extend 或显式使用时才参与编译。
- inline：原样内联，不经 Less 处理。
- less/css：强制按 Less 或纯 CSS 解析。
- once/multiple：控制重复导入行为。
- optional：文件缺失不导致编译失败。

## 作用域与覆盖

```less
@color: red;
.wrap {
  @color: green;
  .inner {
    color: @color;
  }
}
p {
  color: @color;
}
```

- 变量采用词法作用域，局部覆盖外层同名变量。

## 数学模式与分数

```less
.box {
  width: (100px / 2);
}
```

- 使用括号保证除法被计算，避免输出为原样字符串。

## Source Map 与产物输出

```cmd
lessc --source-map styles\main.less public\css\main.css
```

- 开启 Source Map 便于调试，配合构建链路的 devtool 设置。

## 主题化与设计令牌

```less
@brand-50: #eef2ff;
@brand-500: #4e7cf2;
@radius-sm: 6px;
@space-2: 8px;

.btn {
  background: @brand-500;
  color: #fff;
  border-radius: @radius-sm;
  padding: @space-2 @space-2 * 2;
}
```

- 将颜色、间距、圆角、阴影等抽象为令牌，在不同主题文件中覆写变量以实现主题切换。

## 组件与响应式模式

```less
@bp-sm: 640px;
@bp-md: 768px;

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: @bp-sm) {
    padding: 0 16px;
  }
  @media (min-width: @bp-md) {
    padding: 0 24px;
  }
}
```

## 最佳实践

- 限制嵌套层级在 3 层以内，控制选择器特异性。
- 变量命名采用语义化与令牌化，通过不同入口文件实现主题切换。
- mixin 用于属性组合与逻辑复用，extend 用于结构继承，按职责分离。
- 导入文件切分为 tokens、mixins、base、components、utilities 等模块。
- 编译后配合 PostCSS 与 Autoprefixer 处理兼容性。

## 常见坑

- 除法需要括号以确保计算。
- 引用导入的内容不会直接输出，需搭配 extend 或显式使用。
- 变量作用域覆盖可能导致意外结果，注意局部与全局边界。
- 深度嵌套提升特异性，影响覆盖与维护。
- 选择器插值易造成难以维护的命名，保持命名规则统一。

## 小型速查

- 变量：@x、插值：@{x}
- 父选择器：&、嵌套：.a { .b { } }
- 运算：+ - \* /、单位：unit()、百分比：percentage()
- 颜色：lighten/darken/saturate/desaturate/fade/spin/mix/grayscale
- 列表：length、extract
- 复用：mixin、命名空间、guard
- 继承：:extend
- 导入：reference、inline、less、css、once、multiple、optional
