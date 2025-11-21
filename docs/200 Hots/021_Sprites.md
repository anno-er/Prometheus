# CSS 雪碧图

CSS Sprites（雪碧图）是一种网页性能优化的技术。其核心思想是将多个小图标合并到一张大图中，通过 CSS 来控制显示具体的图标部分。这种技术能够有效减少 HTTP 请求次数，从而提高页面加载速度。

## 关键优势

1. **减少 HTTP 请求**：每次加载一个图像都会发起一次 HTTP 请求，合并图像后只需一次请求，就能获取所需的所有图像。
2. **节省带宽**：由于多个图像合并为一个文件，服务器和客户端之间传输的数据包数量更少，减少了服务器的开销和客户端解析图像的时间。
3. **改善用户体验**：页面加载速度更快，可提升用户体验，尤其是在网络条件不佳的情况下。

## 实现方式

我们需要一张包含多个小图标的大图，以及对应的 `CSS` 样式。每个图标通过调整 `background-position` 属性来显示其在大图中的正确位置。例如：

```css
.icon {
  background-image: url("sprites.png");
  background-repeat: no-repeat;
}
.icon-home {
  width: 32px;
  height: 32px;
  background-position: 0 0;
}
.icon-user {
  width: 32px;
  height: 32px;
  background-position: -32px 0;
}
```

