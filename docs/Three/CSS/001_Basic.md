## 1. CSS 中的 animation、transition、transform 有什么区别？

- **animation**：用于创建动画效果，通过定义关键帧（keyframes）来控制动画的不同状态。
- **transition**：用于在元素属性变化时添加平滑的过渡效果。
- **transform**：用于对元素进行变换，如旋转、缩放、平移等。
- 案例
  - 动画案例：
    - 代码
      ```css
      @keyframes slide-in {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0);
        }
      }
      .element {
        animation: slide-in 0.5s ease-in-out;
      }
      ```
    - 解释：定义了一个名为 slide-in 的关键帧动画，将元素从左侧滑动进入。通过将 animation 属性应用于元素，实现了滑动进入的动画效果。
  - 过渡案例：
    - 代码
      ```css
      .element {
        transition: transform 0.3s ease-in-out;
      }
      .element:hover {
        transform: scale(1.2);
      }
      ```
    - 解释：当鼠标悬停在元素上时，元素的 transform 属性会从初始状态变化为缩放 1.2 倍。通过将 transition 属性应用于元素，实现了平滑的过渡效果。
  - 变换案例：
    - 代码
      ```css
      .element {
        transform: rotate(45deg);
      }
      ```
    - 解释：将元素旋转 45 度。通过将 transform 属性应用于元素，实现了旋转效果。

## 2. 怎么做移动端的样式适配？

- **viewport 设置**：通过 `<meta name="viewport" content="width=device-width,initial-scale=1">` 让布局视口等于设备宽度。
- **rem/vw 适配**：
  - rem：以根字体大小为基准，结合 JS 动态计算 `document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px'`。
  - vw：直接以视口宽度百分比作为单位，如 `width: 50vw`。
- **flexible 方案**：阿里 lib-flexible + postcss-pxtorem 自动把 px 转 rem。
- **媒体查询**：针对断点写差异化样式，如 `@media (max-width: 375px)`。
- **高清屏适配**：利用 `devicePixelRatio` 提供 2x/3x 倍图，或 `image-set` 自动选择。
- **安全区避让**：iPhone X 以后使用 `env(safe-area-inset-bottom)` 避开刘海与圆角。
- 案例
  - rem 布局：
    ```css
    /* 设计稿 750px，分成 10 等份，1rem = 75px */
    html {
      font-size: 13.333333vw;
    } /* 100/750*100 ≈ 13.33vw */
    .box {
      width: 2rem;
      height: 1rem;
    } /* 150px * 75px */
    ```
  - vw 布局：
    ```css
    .card {
      width: 46.933vw;
      margin: 2.667vw;
    } /* 350/750*100 ≈ 46.93vw */
    ```
  - 媒体查询：
    ```css
    @media (max-width: 320px) {
      body {
        font-size: 14px;
      }
    }
    @media (min-width: 768px) {
      body {
        font-size: 16px;
      }
    }
    ```
  - 高清图标：
    ```css
    .logo {
      background-image: url(logo@2x.png);
    }
    @media (-webkit-min-device-pixel-ratio: 3) {
      .logo {
        background-image: url(logo@3x.png);
      }
    }
    ```

## 3. 相邻的两个 inline-block 节点为什么会出现间隔，该如何解决？

- 解释：inline-block 元素之间会出现空格，这是因为 HTML 代码中换行符和空格会被解析为一个空格字符。解决方法有两种：
  - 方法一：将两个 inline-block 元素写在同一行，中间不留空格。
  - 方法二：将父元素的 font-size 设置为 0，然后将子元素的 font-size 设置回原来的值。
- 案例
  - 代码
    ```css
    .parent {
      font-size: 0;
    }
    .child {
      font-size: 16px;
    }
    ```
  - 解释：将父元素的 font-size 设置为 0，然后将子元素的 font-size 设置回原来的值，就可以去掉相邻 inline-block 元素之间的间隔。

## 4. Grid 网格布局是什么？

- 解释：grid 网格布局是一种二维布局系统，用于将页面划分为网格容器和网格项。通过定义网格容器的行和列，以及将网格项放置在网格容器中的特定位置，实现复杂的布局效果。
- grid 相关属性：
  - display: grid; 定义网格容器
  - grid-template-columns: repeat(3, 1fr); 定义网格容器的列数和宽度
  - grid-gap: 20px; 定义网格项之间的间距
  - grid-template-rows: repeat(2, 1fr); 定义网格容器的行数和高度
  - grid-auto-flow: column; 确定网格项的放置顺序
  - grid-auto-columns: 1fr; 定义自动生成的网格项的宽度
  - grid-auto-rows: 1fr; 定义自动生成的网格项的高度
- 案例
  - 代码
    ```css
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 20px;
    }
    .grid-item {
      background-color: #f2f2f2;
      padding: 20px;
    }
    ```
  - 解释：定义了一个 3 列网格容器，列之间的间距为 20px。每个网格项都有相同的背景颜色和内边距。通过将 grid-container 类应用于父元素，将 grid-item 类应用于子元素，就可以实现一个简单的网格布局。

## 5. CSS3 新增了哪些特性？

- **选择器增强**：属性选择器 `[attr^="val"]`、结构伪类 `:nth-child(n)`、`:not()` 等。
- **圆角与阴影**：`border-radius`、`box-shadow`、`text-shadow`。
- **渐变与背景**：线性渐变 `linear-gradient`、径向渐变 `radial-gradient`、多重背景 `background-image: url(), url()`。
- **过渡与动画**：`transition`、`@keyframes`、`animation`。
- **2D/3D 变换**：`transform: translate/rotate/scale/skew`、`perspective`、`backface-visibility`。
- **弹性布局**：`display: flex` 及相关属性 `flex-direction`、`justify-content`、`align-items`。
- **网格布局**：`display: grid`、`grid-template-columns/rows`、`gap`。
- **媒体查询**：`@media` 实现响应式断点。
- **Web 字体**：`@font-face` 自定义字体。
- **颜色与透明度**：`rgba()`、`hsl()`、`opacity`。
- **滤镜与混合模式**：`filter: blur/brightness/contrast`、`mix-blend-mode`。
- **多列布局**：`column-count`、`column-gap`、`column-rule`。
- **resize 与 outline 增强**：`resize: both`、`outline-offset`。
- **案例**
  - 圆角按钮：
    ```css
    .btn {
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    ```
  - 渐变背景：
    ```css
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    ```
  - 弹性居中：
    ```css
    .center {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ```

## 6. 怎么使用 CSS3 实现动画？（animation & keyframes）

## 7. 怎么理解回流跟重绘？什么场景下会触发？

- 回流（Reflow）：当 DOM 元素的几何属性发生变化时，浏览器需要重新计算元素的位置和大小，这个过程称为回流。回流是比较昂贵的操作，因为它需要重新布局整个页面。
- 重绘（Repaint）：当 DOM 元素的样式发生变化时，浏览器需要重新绘制元素，这个过程称为重绘。重绘是相对较轻的操作，因为它只需要重新绘制元素的外观，而不需要重新布局。

## 8. 什么是响应式设计？响应式设计的基本原理是什么？如何进行实现？

根据浏览器的宽高不同，展示不同的页面布局。
实现方案：媒体查询、ResizeObserver、flexbox、grid 布局等。
案例：

- 媒体查询：根据不同的屏幕宽度，应用不同的 CSS 样式。
  ```css
  @media screen and (max-width: 768px) {
    /* 移动端样式 */
  }
  ```
- ResizeObserver：监听元素大小变化，根据变化动态调整布局。
  ```javascript
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === targetElement) {
        // 元素大小变化时的处理逻辑
      }
    }
  });
  observer.observe(targetElement);
  ```
- flexbox 布局：利用 flexbox 实现响应式布局，根据容器的宽度自动调整子元素的位置和大小。
  ```css
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 0 0 50%;
  }
  ```
- grid 布局：利用 grid 布局实现响应式布局，根据容器的宽度自动调整子元素的位置和大小。
  ```css
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
  .item {
    background-color: #f2f2f2;
    padding: 20px;
  }
  ```

## 9. 如何使用 CSS 提高页面性能？

- 减少 HTTP 请求次数：合并 CSS 文件、使用雪碧图等技术。
- 压缩 CSS 文件：使用工具压缩 CSS 文件，减少文件大小。
- 利用浏览器缓存：设置 CSS 文件的缓存时间，避免重复请求。
- 避免使用 @import 导入 CSS 文件：@import 会阻塞页面加载，应避免使用。
- 避免使用通配符选择器：通配符选择器会匹配所有元素，性能较差。
- 避免使用 !important 声明：!important 会覆盖其他样式，性能较差。

## 10. 如何实现单行/多行文本溢出的省略样式？

- 单行省略：

```css
.single-line-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

- 多行省略：

```css
.multi-line-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 显示两行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 11. 如何使用 CSS 完成视差滚动效果？

- **核心思路**：利用 `transform: translateZ()` 制造层级深度差异，再为父级设置 `perspective` 与 `overflow-y: scroll`，使不同层级在滚动时产生速度差。
- **必备属性**：
  - `perspective`：给滚动容器加景深。
  - `translateZ()`：把元素推到不同深度；越深移动越慢。
  - `scale()`：补偿 translateZ 造成的尺寸变化，保持视觉大小一致。
  - `transform-style: preserve-3d`：让子元素在 3D 空间继续生效。
- **步骤**：
  1.  滚动容器加 `perspective: 1px; overflow-y: scroll; height: 100vh;`。
  2.  把需要慢速的背景层 `transform: translateZ(-2px) scale(3);`。
  3.  正常内容层保持 `translateZ(0)`。
- **案例**：

  ```css
  /* 滚动容器 */
  .parallax-box {
    height: 100vh;
    overflow-y: auto;
    perspective: 1px;
    transform-style: preserve-3d;
  }

  /* 背景层：远、慢 */
  .parallax-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    background: url(bg.jpg) center/cover;
    transform: translateZ(-2px) scale(3); /* 1 + 2/1 = 3 */
  }

  /* 内容层：正常速度 */
  .content {
    position: relative;
    z-index: 1;
    background: #fff;
    padding: 3rem;
    transform: translateZ(0);
  }
  ```

- **解释**：背景被推远 2px，浏览器为保持其视觉大小自动缩小，于是用 scale(3) 把尺寸拉回；滚动时背景位移量只有前景的 1/3，形成视差。全程纯 CSS，无 JS。

## 12. 如何用 CSS 画一个三角形（利用边框）？

    ```css
    .triangle {
      width: 0;
      height: 0;
      border-left: 50px solid transparent;
      border-right: 50px solid transparent;
      border-bottom: 100px solid red;
    }
    ```

## 13. 说说对 CSS 工程化的理解

- **定义**：CSS 工程化 = 用软件工程的方法管理、编写、构建、交付样式代码，让 CSS 可维护、可扩展、可复用、可测试。
- **核心痛点**：
  1.  全局污染：一个选择器改一行，全站样式“雪崩”。
  2.  命名冲突：多人协作极易撞名，样式被互相覆盖。
  3.  死代码：不敢删，不知道哪一处还在用。
  4.  无静态检查：写错一个属性、漏写分号，线上才炸。
  5.  性能：文件大、请求多、无压缩、无按需加载。
- **解决思路**：
  - **模块化 / 组件化**：CSS Modules、Vue Scoped、React CSS-in-JS，把样式绑在组件上，天生隔离。
  - **命名方法论**：BEM、OOCSS、SMACSS，统一命名规则，降低心智负担。
  - **预处理器**：Sass / Less / Stylus，提供变量、嵌套、Mixin、函数，提升复用与可维护性。
  - **后处理器**：PostCSS + autoprefixer、postcss-pxtorem、cssnano，自动补前缀、压缩、转码。
  - **静态检查**：stylelint 像 ESLint 一样做语法检查 + 团队风格约束。
  - **构建集成**：Webpack / Vite / Rollup 插件链，把 `.scss` → `.css` → 自动加哈希 → 压缩 → 雪碧图 → 内联关键 CSS → 按需拆包。
  - **设计变量体系**：用 Design Token（颜色、字号、圆角、间距）集中管理，一处改、处处改。
  - **按需加载**：基于路由或组件做 code-split，减少首屏 CSS 体积。
  - **原子化方案**：Tailwind、UnoCSS，把样式原子化，用类名拼 UI，构建时摇树，生成最小原子集。
- **落地案例**：

  ```scss
  // 设计变量
  $primary: #1890ff;
  $border-radius: 4px;

  // 组件级样式（CSS Modules）
  .button {
    color: #fff;
    background: $primary;
    border-radius: $border-radius;
    @include flex-center;
    &.large {
      padding: 12px 24px;
    }
  }
  ```

  ```js
  // webpack 链
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      { loader: 'css-loader', options: { modules: true } },
      'postcss-loader',
      'sass-loader'
    ]
  }
  ```

- **收益**：多人并行不冲突、需求变更可预测、样式可单元测试、上线包体最小、可灰度可回滚，最终实现“像写 JS 一样写 CSS”。

## 14. 怎么触发 BFC，BFC 有什么应用场景？

- **BFC（Block Formatting Context）**：块级格式化上下文，是页面渲染时的一块独立区域，内部元素的布局与外部互不影响。
- **触发条件**（任意一条即可）：
  1.  根元素（`<html>`）。
  2.  浮动元素：`float: left / right`。
  3.  绝对定位：`position: absolute / fixed`。
  4.  `display: inline-block / table-cell / table-caption / flex / grid`。
  5.  `overflow: hidden / auto / scroll`（非 visible）。
  6.  `contain: layout / content / paint`。
- **典型应用场景**：
  1.  清除浮动：父元素触发 BFC 后，可自动包裹浮动子元素，无需额外清除。
  2.  防止 margin 垂直合并：BFC 内部 margin 不会与外部合并。
  3.  阻止元素被浮动覆盖：非浮动元素触发 BFC 后，不会环绕浮动元素，而是独占一行。
- **案例**：

  ```css
  .clearfix {
    overflow: hidden; /* 触发 BFC */
  }
  .float-child {
    float: left;
    width: 100px;
    height: 100px;
    background: #f40;
  }
  ```

  ```html
  <div class="clearfix">
    <div class="float-child"></div>
  </div>
  ```

  - 解释：父元素通过 `overflow: hidden` 触发 BFC，自动计算并包裹浮动子元素高度，实现“清除浮动”效果。

## 15. 单行文本怎么实现两端对齐？

- **核心思路**：利用 `text-align: justify` 让文字在行内均匀分布；但单行时默认不生效，需借助“伪元素占位”或“text-align-last”强制两端对齐。
- **方案一**：伪元素撑满最后一行
  ```css
  .justify {
    text-align: justify;
    line-height: 1.5;
  }
  .justify::after {
    content: "";
    display: inline-block;
    width: 100%;
    height: 0;
  }
  ```
- **方案二**：直接设置最后一行对齐方式（兼容性 IE≥8）
  ```css
  .justify {
    text-align: justify;
    text-align-last: justify; /* 关键属性 */
  }
  ```
- **案例**
  ```html
  <p class="justify">单行文本两端对齐</p>
  ```
  两种写法均可让单行文字左右顶格，实现“假两端”效果；多行场景同样适用。

## 16. 说说你对 CSS 模块化的理解，CSS 模块化的实现方式

- **理解**：CSS 模块化 = 把“全局样式”拆成“局部作用域”，让类名只在本文件生效，解决命名冲突、全局污染、死代码问题，实现“谁引入、谁使用、谁负责”。
- **核心原理**：构建阶段把原始类名哈希化成唯一标识，同时生成 JS 映射对象，运行时再动态插入带作用域的 `<style>`。
- **主流实现方式**：
  1.  **CSS Modules**（Webpack / Vite 内置）
      - 文件命名：`button.module.css`
      - 使用：
        ```js
        import styles from "./button.module.css";
        <button className={styles.primary}>提交</button>;
        ```
      - 构建产物：`.primary` → `._button_primary_3a7b2`，保证全局唯一。
  2.  **Vue Scoped CSS**
      - 单文件组件内 `<style scoped>`，编译时给模板节点加 `data-v-7ba5bd90` 属性，样式自动带属性选择器，实现“组件级隔离”。
  3.  **React CSS-in-JS**（styled-components、emotion）
      - 样式即组件，运行时在 `<head>` 插入带哈希的 `<style>`，彻底无类名，支持主题、动态样式。
  4.  **Shadow DOM**（Web Components）
      - 自定义元素内部样式与外部完全隔离，浏览器原生支持，适合框架无关的通用组件库。
- **落地对比**：
  | 方案 | 类名哈希 | 静态文件 | 服务端渲染 | 动态主题 | 学习成本 |
  |---------------|----------|----------|------------|----------|----------|
  | CSS Modules | ✅ | ✅ | ✅ | ❌ | 低 |
  | Vue Scoped | ✅ | ✅ | ✅ | ❌ | 低 |
  | CSS-in-JS | ✅ | ❌ | ✅ | ✅ | 中 |
  | Shadow DOM | ✅ | ✅ | ✅ | ✅ | 高 |
- **最佳实践**：
  - 业务系统：Vue/React 项目优先用 Scoped / CSS Modules，配合变量文件实现主题。
  - 组件库：Shadow DOM 或 CSS-in-JS，保证任意技术栈引入都不被污染。
  - 原子化：Tailwind 编译阶段自动哈希，兼顾“原子类”与“模块化”。
- **一句话总结**：CSS 模块化让样式像 JS 模块一样可复用、可维护、可测试，告别“全局搜索改 class”的噩梦。

## 18. 怎么让 Chrome 支持小于 12px 的文字？-- scale

## 19. flexbox(弹性盒布局模型）是什么，适用什么场景？ - 一种一维布局模型，用于在容器中对齐和分布元素。

    - 适用场景：
      - 简单的一维布局（如导航栏、列表等）
      - 响应式设计（自适应不同屏幕尺寸）
      - 居中对齐（水平/垂直）
      - 等分布局（元素等宽或等高）
      - 动态调整元素顺序（如响应式导航栏）

## 20. 如何实现两栏布局，右侧自适应？三栏布局中间自适应呢？ flex grid

## 21. 设备像素、css 像素、设备独立像素、dpr、ppi 之间有什么区别?

- 设备像素（Device Pixel）：
  - 物理像素，屏幕上最小的显示单位。
  - 不同设备有不同的像素密度，如 Retina 屏的 dpr 为 2。
- CSS 像素（CSS Pixel）：
  - 网页上的虚拟像素，用于布局和渲染。
  - 1 CSS 像素 = 1 设备独立像素（DIP）。
- 设备独立像素（Device Independent Pixel）：
  - 独立于设备的像素单位，用于布局。
  - 1 DIP = 1 物理像素 / dpr。
- 设备像素比（DPR）：
  - 设备像素与设备独立像素的比例。
  - 例如，Retina 屏的 dpr 为 2，普通屏的 dpr 为 1。
- 像素密度（PPI）：
  - 每英寸的像素数，用于描述屏幕的清晰度。

## 22. 说说你对盒子模型的理解

- 盒子模型（Box Model）：
  - 每个 HTML 元素都可以看作是一个矩形盒子，包含内容（content）、内边距（padding）、边框（border）、外边距（margin）。
  - 盒子模型分为标准模型（W3C 盒子模型）和 IE 盒子模型（怪异盒子模型）。
  - 标准模型：宽度 = 内容宽度 + 内边距 + 边框宽度 + 外边距宽度。
  - IE 盒子模型：宽度 = 内容宽度 + 内边距 + 边框宽度。

## 23. 怎么实现样式隔离？scope 作用域

- 作用域（Scope）：
  - 指变量、函数、类等在代码中可见的范围。
  - 作用域分为全局作用域、函数作用域、块级作用域。
  - 全局作用域：在整个代码中都可见。
  - 函数作用域：在函数内部可见，外部不可见。
  - 块级作用域：在 `{}` 内部可见，外部不可见。
- CSS 作用域：
  - 指 CSS 样式在 HTML 文档中生效的范围。
  - 作用域分为全局作用域、局部作用域。
  - 全局作用域：在整个文档中都生效。
  - 局部作用域：在指定元素内部生效，外部不可见。

## 24. flex 布局下，怎么改变元素的顺序？

- 改变元素顺序：
  - 使用 `order` 属性。
  - 默认值为 0，可设置为负数或正数。
  - 数值越小，元素越靠前。

## 25 CSS 后处理器与预处理器

CSS预处理器和后处理器是用于提升CSS编写和管理效率的工具。CSS预处理器如Sass、Less可提供变量、嵌套、混合等高级功能来编写更具结构性
和模块化的CSS代码。CSS后处理器如PostCSS则侧重于通过插件牛机制自动优化和增强CSS,例如自动添加浏览器前缀等。这些工具的使用可以使
CSS代码更简洁、易维护,同时提升开发效率和项目的可广展性

- 后处理器（Post-Processor）：
  - 指在 CSS 代码生成后，对其进行处理的工具。
  - 常用后处理器：PostCSS、Autoprefixer、CSSNano。
- 预处理器（Pre-Processor）：
  - 指在 CSS 代码编写前，对其进行处理的工具。
  - 常用预处理器：Sass、Less、Stylus。
