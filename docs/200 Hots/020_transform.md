# Translate 改变位置

在前端开发中，我们有时候会选择使用 translate 来改变元素的位置，而不是使用传统的定位方式（如 top、left、right、bottom）。具体来说，主要是因为性能方面的考虑。

translate 是通过 CSS transforms 实现的，它操作的是元素的渲染层，而不是布局层。这样一来，浏览器就不会因为位置的改变而重新计算布局（reflow），从而提高渲染性能。

## 拓展知识

### Transform 属性

`transform` 是 `CSS3` 中一个重要的属性，用于对元素进行变换，比如旋转、缩放、移动、倾斜等等。

`transform` 属性允许您对元素进行任意的二维或三维变换。

### 语法

transform: `<transform-functions>`, 其中，`transform-functions` 可以是多个函数组合，比如:

- translate(x,y) - 移动元素
- rotate(angle) - 旋转元素
- scale(x,y) - 缩放元素
- skew(x,y) - 倾斜元素
