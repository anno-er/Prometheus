# 常见 Meta 标签

`<meta>`标签由 name 和 content 属性定义，用来描述网页文档的属性，比如网页的作者、网页描述、关键词等。除了 HTTP 标准固定了一些 name 作为大家使用的共识，还可以自定义 name 属性在`<meta>`标签中用来指定元数据的名称，表示描述的信息类型。content 属性用来提供与 name 属性对应的实际数据或信息，值是具体的内容，可以是文本、网址或其他数据。

## Meta 标签分类详解

### 基础必备
| 标签名称/属性 | 主要作用 | 典型代码示例 |
|-------------|---------|------------|
| 字符集 (`charset`) | 定义文档字符编码，确保文字正确显示 | `<meta charset="UTF-8">` |
| 视口 (`viewport`) | 控制移动端布局和缩放，实现响应式设计 | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |

### SEO优化
| 标签名称/属性 | 主要作用 | 典型代码示例 |
|-------------|---------|------------|
| 页面描述 (`description`) | 提供页面内容简介，常显示在搜索结果中 | `<meta name="description" content="页面描述内容">` |
| 页面关键词 (`keywords`) | 为页面指定关键词（当前搜索引擎权重降低） | `<meta name="keywords" content="关键词1, 关键词2">` |
| 搜索引擎索引 (`robots`) | 指导搜索引擎机器人如何抓取和索引页面 | `<meta name="robots" content="index, follow">` |

### 浏览器与兼容性
| 标签名称/属性 | 主要作用 | 典型代码示例 |
|-------------|---------|------------|
| IE兼容模式 (`X-UA-Compatible`) | 指示IE浏览器使用最新渲染引擎 | `<meta http-equiv="X-UA-Compatible" content="IE=edge">` |
| 缓存控制 (`Cache-Control`等) | 控制浏览器是否缓存当前页面 | `<meta http-equiv="Cache-Control" content="no-cache">` |
| 页面刷新/重定向 (`refresh`) | 设置页面自动刷新或跳转到其他URL | `<meta http-equiv="refresh" content="5;url=https://example.com">` |

### 社交媒体分享
| 标签名称/属性 | 主要作用 | 典型代码示例 |
|-------------|---------|------------|
| Open Graph协议 (`og:`) | 控制在社交平台（如Facebook）分享时的展示效果 | `<meta property="og:title" content="分享标题">` |
| Twitter卡片 (`twitter:`) | 优化在Twitter上分享时的卡片样式 | `<meta name="twitter:card" content="summary">` |

### 其他实用标签
| 标签名称/属性 | 主要作用 | 典型代码示例 |
|-------------|---------|------------|
| 作者信息 (`author`) | 声明网页作者 | `<meta name="author" content="作者名">` |
| 主题颜色 (`theme-color`) | 为浏览器地址栏或手机状态栏设置主题色 | `<meta name="theme-color" content="#4285f4">` |