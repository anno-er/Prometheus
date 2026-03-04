# HTML 基础知识速查

## 1. 什么是 DOM 和 BOM

- DOM：文档对象模型，用树结构表示页面，提供操作节点的标准 API（document、Element、Node 等）。
- BOM：浏览器对象模型，提供与浏览器环境交互的对象（window、location、history、navigator、screen 等）。
- 区别：DOM 面向“文档”，BOM 面向“浏览器环境”。DOM 标准化程度更高；BOM 包含但不限于 DOM。

## 2. 从输入网址到页面显示

- 解析 URL → DNS 解析 → 建立 TCP/TLS → 发送 HTTP 请求。
- 服务器返回响应；浏览器根据 Content-Type 开始处理。
- 解析 HTML 构建 DOM；解析 CSS 构建 CSSOM；加载并执行 JS（可能阻塞解析）。
- 合成渲染树 → 布局（reflow）→ 绘制（repaint）→ GPU 合成。
- 并行加载外部资源（图片、字体等）；可能命中缓存或被 Service Worker 拦截。

## 3. 设备的 dpr 是否可变

- DPR=物理像素/设备独立像素。设备物理 DPR 基本固定，但 window.devicePixelRatio 会随浏览器缩放、系统设置变化而改变，因此“可变”。

## 4. 图片格式选择

- PNG：无损、支持透明，适合图标/UI。
- JPEG：有损，适合照片；渐进式提升首屏感知。
- WebP/AVIF：更高压缩率；WebP 支持广泛，AVIF 更优但编码更慢。
- SVG：矢量，无限缩放清晰，适合图标/插图。
- GIF：动图但色彩少；更推荐 APNG/WebP 动图。
- 选择依据：内容类型、是否透明/动画、体积、兼容性；可用 picture+source 提供多格式。

## 5. 跨页面通信方法

- postMessage、MessageChannel。
- BroadcastChannel、SharedWorker/Service Worker。
- localStorage 的 storage 事件（同源）。
- 同域 iframe 直接访问父/子 window。
- WebSocket/服务器中转、IndexedDB 事件、URL 参数/哈希。
- window.name、Cookie+轮询等。

## 6. 对 DOM 树的理解

- 树由各类 Node 组成：元素、文本、注释等；存在父子/兄弟关系。
- 操作与遍历：querySelector、createElement、append/remove；频繁操作会触发布局与重绘。
- Shadow DOM 提供封装的子树，避免样式/事件泄漏。

## 7. 行内、块级与空元素

- 行内：a、span、img、input、label、strong、em、b、i、code、small、sub、sup、button 等。
- 块级：div、p、h1–h6、ul/ol/li、section、article、header、footer、nav、table、form、pre、blockquote 等。
- 空元素（void）：br、hr、img、input、link、meta、area、base、col、embed、source、track、wbr。

## 8. HTML 与 CSS 的图片加载与渲染

- HTML 的 img：解析到即请求，解码后参与绘制；缺少显式尺寸可能导致回流。
- CSS 的 background-image：样式匹配后加载，不参与语义；尺寸由 background-size 等决定。
- 优先级与策略：浏览器基于预加载扫描、可视性、priority hints；lazy 属性与 IntersectionObserver 可懒加载。
- 解码与绘制：可能异步解码；object-fit、image-rendering 等影响呈现。

## 9. title vs h1、b vs strong、i vs em

- title：页面元信息显示于浏览器标签或 tooltip，不参与文档大纲。
- h1：文档主标题，参与语义大纲与可访问性。
- b：仅样式加粗；strong：语义“强调”，读屏器更重读。
- i：仅斜体样式；em：语义强调，可嵌套提升强调等级。

## 10. script 放在 body 底部、defer 与 async

- 将脚本置底可减少阻塞解析。
- defer：异步下载，按顺序在文档解析完成后执行（在 DOMContentLoaded 触发前执行完成）；适合依赖文档的脚本。
- async：异步下载，下载完成即执行，顺序不保证；适合互不依赖的脚本。
- type=module 默认类似 defer（模块按依赖图执行）。

## 11. 对 SSG 的理解

- Static Site Generation：在构建时生成静态 HTML，CDN 缓存，首屏快、SEO 友好。
- 适用：内容相对稳定；可配合增量静态再生成（ISR）、客户端增强。

## 12. 什么是 HTML5，区别

- HTML5：最新的 HTML 标准与相关 Web API 集合。
- 引入：语义标签（section、article…）、audio/video、canvas、存储（localStorage、IndexedDB）、通信（WebSocket、postMessage）、离线与 PWA 能力、地理位置、表单增强等。
- 区别：更语义化、更富媒体、API 丰富；文档类型简化为 `<!doctype html>`。

## 13. 渐进增强与优雅降级

- 渐进增强：以基础功能为起点，逐步为高能力环境提高体验。
- 优雅降级：以完整体验为目标，为低能力环境保留基本可用。
- 实践：语义化 HTML、特性检测、条件加载与合理的降级策略。

## 14. Node 与 Element 的关系

- Node 是所有节点的基类；Element 是一种节点，表示元素，继承自 Node。
- Text、Comment 等也继承自 Node；NodeList、HTMLCollection 是不同的集合类型。

## 15. 白屏时间长的原因与优化

- 原因：网络链路慢（DNS/TCP/TLS）、服务器响应慢、资源体积大与阻塞、重定向多、渲染主线程长任务、图片解码慢、首屏数据等待等。
- 优化：DNS 预解析/预连接、CDN、减少重定向、压缩与拆分资源、关键 CSS 内联、JS async/defer、SSR/SSG/预渲染、懒加载与现代图片格式、减少首屏 JS、Web Worker、避免布局抖动、优化长任务。

## 16. 控制 input 输入字数

- 原生属性：maxlength/minlength。
- JS：监听 input/composition 事件，按需要截断或校验；正则限制。
- 注意中文输入法合成阶段（compositionstart/update/end）。

## 17. 渐进式 JPEG

- Progressive JPEG：多次扫描由粗到细逐步清晰，提升首屏感知。
- 与 baseline 对比：baseline 逐行显示；现代浏览器普遍支持，体积相近或更优。

## 18. 选择图片后浏览器预览

- 获取 File：监听 `<input type="file">` 的 change 事件。
- 预览：使用 `URL.createObjectURL(file)` 或 `FileReader.readAsDataURL(file)` 赋值给 `img.src`。
- 清理与安全：类型校验、大小限制，使用后 `URL.revokeObjectURL()`。

## 19. 点击回到顶部

- 锚点：链接到 `#top` 并在顶部放置对应元素。
- JS：`window.scrollTo({ top: 0, behavior: 'smooth' })`。
- CSS：`html { scroll-behavior: smooth; }` 针对锚点滚动。

## 20. SPA 应用进行 SEO

- SSR/SSG/预渲染（prerender）或动态渲染（为爬虫提供已渲染版本）。
- 语义化 HTML、合理的标题与描述、结构化数据（JSON-LD）。
- 路由稳定可抓取、sitemap 与 robots.txt、canonical。

## 21. 实现 SEO 优化

- 高质量内容与清晰站点结构，移动端友好。
- 速度优化与 Core Web Vitals。
- 合理的关键词策略、meta 标记、结构化数据、OG/Twitter 标签。
- 健康的内外链、HTTPS、安全与可访问性。

## 22. 什么是 SEO

- Search Engine Optimization：提升自然搜索可见度与排名的技术与策略。

## 23. SEO 原理

- 爬取 → 解析/索引 → 排名。
- 排名依据：内容相关性与质量、链接信号、用户体验与速度、技术健康度、语义理解与个性化。

## 24. DNS 预解析是什么、如何实现

- 预先解析域名以降低首包延迟。
- 实现：`<link rel="dns-prefetch" href="//example.com">`。
- 进一步：`<link rel="preconnect" href="https://example.com" crossorigin>` 提前建连；也可用响应头配置。

## 25. HTML5 的 drag 相关 API

- 原生拖放：`draggable` 属性；`dragstart`、`dragover`、`dragleave`、`drop` 等事件。
- `DataTransfer`：`setData/getData`、`effectAllowed/dropEffect` 控制数据与效果。
- 文件拖拽：`DataTransfer.files`；记得阻止默认以允许 drop。
