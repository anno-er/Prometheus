# Webpack 面试知识点详解

## 一、Webpack 基础概念

### 1.1 什么是 Webpack

Webpack 是一个现代 JavaScript 应用程序的**静态模块打包工具**。它将项目中的各种资源（JavaScript、CSS、图片、字体等）视为模块，通过依赖关系图分析模块间的依赖，最终打包成浏览器可识别的静态资源。

### 1.2 核心概念

```
Webpack 核心概念
├── Entry（入口）
├── Output（输出）
├── Loader（加载器）
├── Plugin（插件）
├── Module（模块）
├── Chunk（代码块）
├── Bundle（打包文件）
└── Mode（模式）
```

#### Entry（入口）

指示 Webpack 应该使用哪个模块作为构建内部依赖图的起点。

```javascript
// 单入口
module.exports = {
  entry: './src/index.js'
};

// 多入口
module.exports = {
  entry: {
    main: './src/index.js',
    admin: './src/admin.js'
  }
};
```

#### Output（输出）

告诉 Webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件。

```javascript
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    clean: true, // 清理旧文件
    publicPath: '/' // 公共路径
  }
};
```

#### Loader（加载器）

Webpack 只能理解 JavaScript 和 JSON 文件，Loader 让 Webpack 能够处理其他类型的文件，并将它们转换为有效模块。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  }
};
```

#### Plugin（插件）

用于执行范围更广的任务，包括打包优化、资源管理、环境变量注入等。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://api.example.com')
    })
  ]
};
```

#### Mode（模式）

提供 `development`、`production`、`none` 三种模式，启用相应的内置优化。

```javascript
module.exports = {
  mode: 'production' // development | production | none
};
```

---

## 二、常用 Loader 详解

### 2.1 样式处理 Loader

```javascript
module.exports = {
  module: {
    rules: [
      // CSS 处理
      {
        test: /\.css$/,
        use: [
          'style-loader', // 将 CSS 注入到 DOM
          'css-loader',   // 解析 CSS 文件
          'postcss-loader' // 添加浏览器前缀
        ]
      },
      // Sass/Scss 处理
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'   // 编译 Sass 到 CSS
        ]
      },
      // Less 处理
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'   // 编译 Less 到 CSS
        ]
      }
    ]
  }
};
```

### 2.2 JavaScript/TypeScript Loader

```javascript
module.exports = {
  module: {
    rules: [
      // Babel 转译
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // TypeScript 处理
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};
```

### 2.3 文件资源 Loader

```javascript
module.exports = {
  module: {
    rules: [
      // Webpack 5 资源模块
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb 以下转为 base64
          }
        },
        generator: {
          filename: 'images/[name].[hash:8][ext]'
        }
      },
      // 字体文件
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]'
        }
      }
    ]
  }
};
```

### 2.4 其他常用 Loader

| Loader | 用途 |
|--------|------|
| `vue-loader` | 编译 Vue 单文件组件 |
| `eslint-loader` | 代码规范检查 |
| `thread-loader` | 多线程打包 |
| `cache-loader` | 缓存 Loader 结果 |
| `imports-loader` | 注入变量到模块 |
| `exports-loader` | 导出模块变量 |

---

## 三、常用 Plugin 详解

### 3.1 HTML 处理插件

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
```

### 3.2 代码优化插件

```javascript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 多线程压缩
        terserOptions: {
          compress: {
            drop_console: true, // 移除 console
            drop_debugger: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
  }
};
```

### 3.3 代码分割插件

```javascript
const { SplitChunksPlugin } = require('webpack').optimize;

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 提取第三方库
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        // 提取公共代码
        common: {
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
};
```

### 3.4 其他常用 Plugin

| Plugin | 用途 |
|--------|------|
| `CleanWebpackPlugin` | 清理输出目录 |
| `CopyWebpackPlugin` | 复制静态文件 |
| `DefinePlugin` | 定义全局常量 |
| `ProvidePlugin` | 自动加载模块 |
| `HotModuleReplacementPlugin` | 热模块替换 |
| `MiniCssExtractPlugin` | 提取 CSS 到单独文件 |
| `BundleAnalyzerPlugin` | 可视化分析包大小 |

---

## 四、Webpack 优化策略

### 4.1 构建性能优化

#### 1. 使用最新版本
```bash
npm install webpack@latest webpack-cli@latest
```

#### 2. 缩小 Loader 作用范围
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'), // 只处理 src 目录
        exclude: /node_modules/, // 排除 node_modules
        use: 'babel-loader'
      }
    ]
  }
};
```

#### 3. 使用缓存
```javascript
module.exports = {
  cache: {
    type: 'filesystem', // 持久化缓存
    buildDependencies: {
      config: [__filename]
    }
  }
};
```

#### 4. 多线程打包
```javascript
const os = require('os');
const threads = os.cpus().length;

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: { workers: threads }
          },
          'babel-loader'
        ]
      }
    ]
  }
};
```

#### 5. 减少解析
```javascript
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')], // 指定模块查找路径
    extensions: ['.js', '.jsx'], // 减少后缀尝试
    mainFields: ['main'], // 减少字段查找
    alias: {
      '@': path.resolve(__dirname, 'src') // 路径别名
    }
  }
};
```

### 4.2 产物优化

#### 1. Tree Shaking
```javascript
module.exports = {
  mode: 'production',
  optimization: {
    usedExports: true, // 标记未使用代码
    sideEffects: false // 无副作用，可安全删除
  }
};

// package.json
{
  "sideEffects": [
    "*.css",
    "*.scss"
  ]
}
```

#### 2. 代码分割
```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

#### 3. 懒加载
```javascript
// 动态导入实现懒加载
const button = document.createElement('button');
button.textContent = '加载模块';
button.onclick = () => {
  import(/* webpackChunkName: "lodash" */ 'lodash')
    .then(({ default: _ }) => {
      console.log(_.join(['Hello', 'webpack'], ' '));
    });
};
```

#### 4. 预加载/预获取
```javascript
import(/* webpackPrefetch: true */ './path/to/module.js'); // 预获取
import(/* webpackPreload: true */ './path/to/module.js');   // 预加载
```

### 4.3 运行时优化

```javascript
module.exports = {
  optimization: {
    runtimeChunk: 'single', // 提取 runtime 代码
    moduleIds: 'deterministic', // 稳定的模块 ID
    chunkIds: 'deterministic'   // 稳定的 chunk ID
  }
};
```

---

## 五、Webpack 5 新特性

### 5.1 资源模块（Asset Modules）

Webpack 5 内置了资源模块，无需额外安装 `file-loader`、`url-loader`、`raw-loader`。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource' // 对应 file-loader
      },
      {
        test: /\.svg$/,
        type: 'asset/inline'   // 对应 url-loader（base64）
      },
      {
        test: /\.txt$/,
        type: 'asset/source'   // 对应 raw-loader
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset',         // 根据大小自动选择
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      }
    ]
  }
};
```

### 5.2 持久化缓存

```javascript
module.exports = {
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.webpack_cache'),
    store: 'pack',
    buildDependencies: {
      config: [__filename]
    }
  }
};
```

### 5.3 模块联邦（Module Federation）

实现微前端架构，允许多个独立构建的应用共享模块。

```javascript
// 远程应用配置
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button'
      },
      shared: ['react', 'react-dom']
    })
  ]
};

// 宿主应用配置
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js'
      },
      shared: ['react', 'react-dom']
    })
  ]
};

// 使用远程模块
const RemoteButton = React.lazy(() => import('remoteApp/Button'));
```

### 5.4 其他改进

- **更好的 Tree Shaking**：支持嵌套模块和 CommonJS
- **长期缓存优化**：稳定的 chunk ID 和模块 ID
- **移除 Node.js Polyfills**：减少 bundle 体积
- **改进的 Target 配置**：更好地支持 Web/Node/Electron

---

## 六、Webpack 配置实战

### 6.1 完整配置示例

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  
  entry: {
    main: './src/index.js'
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction 
      ? 'js/[name].[contenthash:8].js' 
      : 'js/[name].js',
    chunkFilename: isProduction 
      ? 'js/[name].[contenthash:8].chunk.js' 
      : 'js/[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    clean: true,
    publicPath: '/'
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 }
        }
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: isProduction
    }),
    isProduction && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin()
  ].filter(Boolean),
  
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: 'single'
  },
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  
  cache: {
    type: 'filesystem'
  },
  
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true
  },
  
  devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map'
};
```

---

## 七、Webpack 面试常见问题

### Q1: Loader 和 Plugin 的区别？

| 特性 | Loader | Plugin |
|------|--------|--------|
| **作用** | 转换文件类型 | 执行更广泛的任务 |
| **执行时机** | 模块加载时 | 整个编译周期 |
| **配置位置** | module.rules | plugins 数组 |
| **功能范围** | 文件转换 | 打包优化、资源管理 |
| **示例** | babel-loader、css-loader | HtmlWebpackPlugin、TerserPlugin |

### Q2: Webpack 的构建流程？

```
1. 初始化参数：合并配置文件和命令行参数
2. 开始编译：创建 Compiler 对象，加载插件
3. 确定入口：解析 entry 配置
4. 编译模块：从入口开始递归解析依赖
5. 完成编译：得到模块依赖关系图
6. 输出资源：根据依赖图组装成 chunks
7. 输出完成：将 chunks 写入文件系统
```

### Q3: 如何实现懒加载？

```javascript
// ES6 动态导入
import('./module.js').then(module => {
  module.default();
});

// React 懒加载
const LazyComponent = React.lazy(() => import('./Component'));

// Vue 异步组件
const AsyncComponent = () => import('./Component.vue');
```

### Q4: 如何优化 Webpack 构建速度？

1. **使用最新版本**：Webpack 5 性能大幅提升
2. **缩小 Loader 范围**：使用 `include`/`exclude`
3. **开启缓存**：`cache: { type: 'filesystem' }`
4. **多线程打包**：使用 `thread-loader`
5. **减少解析**：配置 `resolve.extensions`、`resolve.alias`
6. **DllPlugin**：预编译第三方库
7. **硬源码插件**：`hard-source-webpack-plugin`

### Q5: Tree Shaking 的原理？

Tree Shaking 依赖于 ES Modules 的静态结构特性：

1. **标记（Mark）**：`usedExports` 识别未使用的导出
2. **清除（Sweep）**：Terser 等压缩工具删除死代码
3. **副作用处理**：`sideEffects` 配置标记有副作用的模块

```javascript
// 会被 Tree Shaking 删除
export const unused = () => console.log('unused');

// 会被保留
export const used = () => console.log('used');
```

### Q6: Webpack 热更新（HMR）原理？

```
1. 文件修改 → Webpack 重新编译
2. 编译结果通过 WebSocket 推送到浏览器
3. 浏览器接收更新，通过 HMR Runtime 应用更新
4. 模块热替换，页面无刷新更新
```

### Q7: Webpack 5 相比 Webpack 4 有哪些改进？

1. **资源模块**：内置处理资源文件，无需 loader
2. **持久化缓存**：文件系统缓存，大幅提升二次构建速度
3. **模块联邦**：支持微前端架构
4. **长期缓存优化**：稳定的 chunk ID
5. **更好的 Tree Shaking**：支持嵌套模块
6. **移除 Node.js Polyfills**：减少 bundle 体积

---

## 八、总结

Webpack 作为前端工程化的核心工具，掌握其原理和优化技巧对于前端开发者至关重要：

1. **理解核心概念**：Entry、Output、Loader、Plugin
2. **熟悉常用配置**：开发/生产环境配置、优化策略
3. **掌握优化技巧**：构建优化、产物优化、运行时优化
4. **关注新特性**：Webpack 5 的资源模块、持久化缓存、模块联邦
