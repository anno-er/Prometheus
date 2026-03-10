# Vite 面试知识点详解

## 一、Vite 基础概念

### 1.1 什么是 Vite

Vite（法语意为"快"）是一个新型前端构建工具，由尤雨溪开发。它利用浏览器原生 ES Modules 特性，提供极速的冷启动和热更新，同时在生产环境下使用 Rollup 进行高效打包。

### 1.2 Vite 的核心优势

```
Vite 优势
├── 极速冷启动（No Bundle）
├── 闪电般的热更新（HMR）
├── 真正的按需编译
├── 开箱即用的配置
├── 基于 Rollup 的生产构建
└── 丰富的插件生态
```

### 1.3 Vite 与传统构建工具的对比

| 特性           | Webpack            | Vite               |
| -------------- | ------------------ | ------------------ |
| **开发模式**   | 先打包再服务       | 原生 ESM，无需打包 |
| **冷启动**     | 慢（需构建依赖图） | 快（直接启动服务） |
| **HMR**        | 较慢               | 极快（基于 ESM）   |
| **生产构建**   | Webpack            | Rollup             |
| **配置复杂度** | 较复杂             | 开箱即用           |
| **浏览器支持** | 广泛               | 现代浏览器         |

---

## 二、Vite 原理详解

### 2.1 开发服务器原理

#### 传统构建工具（Webpack）

```
源代码 → 打包编译 → Bundle → 浏览器
```

#### Vite 开发服务器

```
源代码 → Dev Server → 浏览器（原生 ESM）
              ↓
         按需编译（请求时才编译）
```

### 2.2 预构建（Pre-bundle）

Vite 使用 `esbuild` 对依赖进行预构建，解决以下问题：

1. **CommonJS 转 ESM**：将 CJS 模块转为 ESM
2. **减少请求数量**：将多个文件打包成一个
3. **优化加载性能**：避免瀑布流请求

```javascript
// vite.config.js
export default {
  optimizeDeps: {
    // 预构建包含的依赖
    include: ['lodash-es', 'vue'],
    // 排除预构建的依赖
    exclude: ['some-large-lib'],
    // 强制重新预构建
    force: true,
  },
};
```

### 2.3 模块解析流程

```
浏览器请求模块
    ↓
Vite 拦截请求
    ↓
路径解析（resolveId）
    ↓
加载模块（load）
    ↓
转换代码（transform）
    ↓
返回给浏览器
```

### 2.4 依赖预构建缓存

```
node_modules/.vite/
├── _metadata.json      # 依赖元数据
├── vue.js              # 预构建后的依赖
├── lodash-es.js
└── ...
```

---

## 三、Vite 配置详解

### 3.1 基础配置

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  // 项目根目录
  root: process.cwd(),

  // 基础路径
  base: '/',

  // 模式
  mode: 'development',

  // 插件
  plugins: [vue()],

  // 路径解析
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src/components'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },

  // CSS 配置
  css: {
    devSourcemap: true,
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/vars.scss";`,
      },
    },
  },

  // 开发服务器
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    cors: true,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    hmr: {
      overlay: true,
    },
  },

  // 构建配置
  build: {
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },

  // 预览配置
  preview: {
    port: 4173,
    strictPort: true,
  },

  // 依赖优化
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['some-lib'],
  },

  // 环境变量
  envPrefix: 'VITE_',

  // 日志级别
  logLevel: 'info',

  // 清屏
  clearScreen: true,
});
```

### 3.2 环境变量配置

#### .env 文件

```
# .env                # 所有环境
VITE_APP_TITLE=My App
VITE_API_URL=/api

# .env.development    # 开发环境
VITE_API_URL=http://localhost:8080

# .env.production     # 生产环境
VITE_API_URL=https://api.example.com
```

#### 使用环境变量

```javascript
// 访问环境变量
console.log(import.meta.env.VITE_APP_TITLE);
console.log(import.meta.env.MODE); // 'development' | 'production'
console.log(import.meta.env.DEV); // boolean
console.log(import.meta.env.PROD); // boolean
console.log(import.meta.env.SSR); // boolean
```

### 3.3 多页面配置

```javascript
import { resolve } from 'path';

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
      },
    },
  },
};
```

---

## 四、Vite 插件系统

### 4.1 官方插件

| 插件                       | 用途             |
| -------------------------- | ---------------- |
| `@vitejs/plugin-vue`       | Vue 3 支持       |
| `@vitejs/plugin-vue-jsx`   | Vue JSX 支持     |
| `@vitejs/plugin-react`     | React 支持       |
| `@vitejs/plugin-legacy`    | 旧浏览器兼容     |
| `@vitejs/plugin-basic-ssl` | HTTPS 开发服务器 |

### 4.2 常用社区插件

| 插件                      | 用途         |
| ------------------------- | ------------ |
| `vite-plugin-pwa`         | PWA 支持     |
| `vite-plugin-svg-icons`   | SVG 图标管理 |
| `vite-plugin-compression` | 资源压缩     |
| `vite-plugin-mock`        | Mock 数据    |
| `unplugin-auto-import`    | 自动导入 API |
| `unplugin-vue-components` | 组件自动导入 |

### 4.3 自定义插件

```javascript
// 简单的 Vite 插件
const myPlugin = () => ({
  name: 'my-plugin',

  // 配置钩子
  config(config, { command }) {
    console.log('Config hook');
    return {
      resolve: {
        alias: { foo: 'bar' },
      },
    };
  },

  // 配置解析完成
  configResolved(config) {
    console.log('Config resolved');
  },

  // 配置开发服务器
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      console.log('Request:', req.url);
      next();
    });
  },

  // 转换代码
  transform(code, id) {
    if (id.endsWith('.js')) {
      return {
        code: code.replace(/console\.log/g, ''),
        map: null,
      };
    }
  },

  // 解析模块 ID
  resolveId(source) {
    if (source === 'virtual-module') {
      return source;
    }
  },

  // 加载模块
  load(id) {
    if (id === 'virtual-module') {
      return 'export default "Hello from virtual module"';
    }
  },
});

export default {
  plugins: [myPlugin()],
};
```

### 4.4 插件执行顺序

```
1. config
2. configResolved
3. options (Rollup)
4. buildStart (Rollup)
5. resolveId (Rollup)
6. load (Rollup)
7. transform (Rollup)
8. buildEnd (Rollup)
9. closeBundle (Rollup)
```

---

## 五、Vite 与框架集成

### 5.1 Vue 3 项目配置

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
});
```

### 5.2 React 项目配置

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        plugins: [['babel-plugin-styled-components', { displayName: true }]],
      },
    }),
  ],
});
```

### 5.3 TypeScript 配置

```javascript
export default {
  esbuild: {
    // 配置 JSX
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    // 配置 target
    target: 'es2020',
  },

  // 或者使用插件
  plugins: [
    {
      name: 'ts-config',
      config: () => ({
        esbuild: {
          tsconfigRaw: {
            compilerOptions: {
              experimentalDecorators: true,
            },
          },
        },
      }),
    },
  ],
};
```

---

## 六、Vite 生产构建

### 6.1 构建流程

```
源代码
    ↓
Rollup 打包
    ↓
代码分割（Code Splitting）
    ↓
Tree Shaking
    ↓
代码压缩（Terser/esbuild）
    ↓
生成产物
```

### 6.2 构建优化配置

```javascript
export default {
  build: {
    // 目标浏览器
    target: 'es2015',

    // 输出目录
    outDir: 'dist',

    // 资源目录
    assetsDir: 'assets',

    // 小于此阈值的导入或引用资源将内联为 base64
    assetsInlineLimit: 4096,

    // 启用 CSS 代码分割
    cssCodeSplit: true,

    // 构建后是否生成 source map
    sourcemap: false,

    // 清空输出目录
    emptyOutDir: true,

    // 启用 brotli 压缩
    brotliSize: true,

    // chunk 大小警告阈值
    chunkSizeWarningLimit: 500,

    // Rollup 选项
    rollupOptions: {
      // 外部依赖
      external: ['some-lib'],

      // 输出配置
      output: {
        // 入口文件
        entryFileNames: 'js/[name]-[hash].js',

        // 代码分割后的 chunk
        chunkFileNames: 'js/[name]-[hash].js',

        // 资源文件
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return 'images/[name]-[hash][extname]';
          }
          if (/\.css$/i.test(assetInfo.name)) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },

        // 手动代码分割
        manualChunks: {
          // 将 vue 相关库打包在一起
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // 将 UI 库打包在一起
          'ui-vendor': ['element-plus'],
        },
      },
    },

    // 代码压缩工具
    minify: 'terser', // 'terser' | 'esbuild' | false

    // Terser 选项
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },

    // 是否将动态导入的 polyfill 单独打包
    polyfillModulePreload: true,

    // 报告压缩后的大小
    reportCompressedSize: true,

    // 自定义底层 Rollup 打包配置
    commonjsOptions: {
      include: [/node_modules/],
    },

    // 动态导入的 polyfill
    dynamicImportVarsOptions: {
      warnOnError: true,
      exclude: [/node_modules/],
    },

    // lib 模式（用于构建库）
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      fileName: 'my-lib',
      formats: ['es', 'umd'],
    },

    // 生成 manifest.json
    manifest: true,

    // 生成 SSR manifest
    ssrManifest: true,

    // SSR 配置
    ssr: 'node', // 'node' | 'webworker'

    // 生成 .gz 文件
    write: true,
  },
};
```

### 6.3 库模式构建

```javascript
import { resolve } from 'path';

export default {
  build: {
    lib: {
      // 入口
      entry: resolve(__dirname, 'src/index.ts'),

      // 库名称
      name: 'MyLibrary',

      // 输出文件名
      fileName: (format) => `my-library.${format}.js`,

      // 输出格式
      formats: ['es', 'umd', 'cjs'],
    },

    rollupOptions: {
      // 外部依赖（不会打包进库）
      external: ['vue', 'react'],

      output: {
        // 全局变量映射
        globals: {
          vue: 'Vue',
          react: 'React',
        },
      },
    },
  },
};
```

---

## 七、Vite 优化策略

### 7.1 开发环境优化

#### 1. 依赖预构建优化

```javascript
export default {
  optimizeDeps: {
    // 强制预构建的依赖
    include: ['vue', 'vue-router', 'pinia', 'element-plus', 'lodash-es'],

    // 排除不需要预构建的依赖
    exclude: ['some-large-lib'],

    // 自定义 esbuild 选项
    esbuildOptions: {
      target: 'es2020',
    },

    // 强制重新预构建
    force: false,
  },
};
```

#### 2. 开发服务器优化

```javascript
export default {
  server: {
    // 预热文件
    warmup: {
      clientFiles: ['./src/components/*.vue'],
    },

    // 文件监听
    watch: {
      usePolling: true, // 某些环境下需要
      interval: 100,
    },

    // HMR 配置
    hmr: {
      overlay: false, // 关闭错误遮罩
    },
  },
};
```

### 7.2 生产环境优化

#### 1. 代码分割策略

```javascript
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将 node_modules 中的依赖单独打包
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vue-vendor';
            }
            if (id.includes('element-plus')) {
              return 'ui-vendor';
            }
            return 'vendor';
          }

          // 按路由分割
          if (id.includes('/views/')) {
            return 'views';
          }
        },
      },
    },
  },
};
```

#### 2. 资源优化

```javascript
export default {
  build: {
    // 内联小资源
    assetsInlineLimit: 4096,

    // CSS 代码分割
    cssCodeSplit: true,

    // CSS 压缩
    cssMinify: true,
  },
};
```

### 7.3 性能监控

```javascript
// 使用 rollup-plugin-visualizer 分析包大小
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    process.env.ANALYZE &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
  ],
};
```

---

## 八、Vite 面试常见问题

### Q1: Vite 为什么快？

**回答要点**：

1. **开发模式**：

   - 利用浏览器原生 ESM，无需打包
   - 按需编译，请求时才编译文件
   - esbuild 预构建依赖（Go 编写，比 JS 快 10-100 倍）

2. **热更新**：

   - 基于 ESM 的 HMR，只更新变更的模块
   - 利用 HTTP 头缓存策略

3. **生产构建**：
   - 使用 Rollup，Tree Shaking 更彻底
   - esbuild 进行代码压缩

### Q2: Vite 和 Webpack 的区别？

| 对比项         | Vite                              | Webpack        |
| -------------- | --------------------------------- | -------------- |
| **开发模式**   | 原生 ESM，无打包                  | 先打包再服务   |
| **冷启动**     | 毫秒级                            | 秒级甚至分钟级 |
| **HMR**        | 极快（毫秒级）                    | 较慢（秒级）   |
| **构建工具**   | esbuild（预构建）+ Rollup（生产） | Webpack        |
| **配置**       | 开箱即用                          | 需要较多配置   |
| **生态**       | 快速发展中                        | 成熟丰富       |
| **浏览器支持** | 现代浏览器                        | 广泛支持       |

### Q3: Vite 的预构建是什么？为什么要预构建？

**预构建目的**：

1. **CommonJS 转 ESM**：将 CJS 依赖转为浏览器可识别的 ESM
2. **性能优化**：将多个文件合并，减少 HTTP 请求
3. **缓存优化**：预构建结果可缓存，提升后续启动速度

**预构建流程**：

```
扫描源代码 → 识别依赖 → esbuild 打包 → 缓存到 node_modules/.vite
```

### Q4: 如何处理 Vite 中的 CommonJS 模块？

```javascript
// 方法一：使用 @originjs/vite-plugin-commonjs
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default {
  plugins: [viteCommonjs()]
};

// 方法二：配置 optimizeDeps
export default {
  optimizeDeps: {
    include: ['some-commonjs-lib']
  }
};

// 方法三：使用 esbuild 配置
export default {
  esbuild: {
    include: [/\.js$/],
    exclude: []
  }
};
```

### Q5: Vite 如何配置代理？

```javascript
export default {
  server: {
    proxy: {
      // 字符串简写
      '/foo': 'http://localhost:4567',

      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          // 自定义代理配置
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxy Request:', req.url);
          });
        },
      },

      // 正则匹配
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
    },
  },
};
```

### Q6: Vite 如何配置多页面？

```javascript
import { resolve } from 'path';

export default {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin/index.html'),
        mobile: resolve(__dirname, 'mobile/index.html'),
      },
    },
  },
};
```

### Q7: Vite 中如何使用环境变量？

```javascript
// .env
VITE_APP_TITLE=My App
VITE_API_URL=https://api.example.com

// 代码中使用
console.log(import.meta.env.VITE_APP_TITLE);

// vite.config.js 中使用
import { loadEnv } from 'vite';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION)
    }
  };
};
```

### Q8: Vite 如何兼容旧浏览器？

```javascript
import legacy from '@vitejs/plugin-legacy';

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: ['es.symbol', 'es.promise', 'es.promise.finally'],
      modernPolyfills: true,
    }),
  ],
};
```

### Q9: Vite 的 HMR 原理？

```
1. 文件修改 → Vite 检测到变更
2. 重新编译变更的模块
3. 通过 WebSocket 通知浏览器
4. 浏览器执行 HMR 客户端代码
5. 只更新变更的模块，保持应用状态
```

### Q10: 如何编写 Vite 插件？

```javascript
const myPlugin = (options = {}) => {
  return {
    name: 'vite-plugin-my',

    // 应用配置
    config(config, { command }) {
      // command: 'build' | 'serve'
    },

    // 配置解析完成
    configResolved(resolvedConfig) {
      // 存储最终配置供其他钩子使用
    },

    // 配置开发服务器
    configureServer(server) {
      // server.middlewares.use(...)
    },

    // 转换代码
    transform(code, id) {
      if (id.endsWith('.js')) {
        return {
          code: transformedCode,
          map: sourceMap,
        };
      }
    },

    // 加载模块
    load(id) {
      if (id === 'virtual:my-module') {
        return 'export default {}';
      }
    },

    // 解析模块 ID
    resolveId(source) {
      if (source === 'virtual:my-module') {
        return source;
      }
    },
  };
};

export default myPlugin;
```

---

## 九、Vite 与 Webpack 迁移

### 9.1 从 Webpack 迁移到 Vite

#### 1. 路径别名迁移

```javascript
// Webpack
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '~': path.resolve(__dirname, 'src/components')
  }
}

// Vite
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src/components')
    }
  }
};
```

#### 2. 环境变量迁移

```javascript
// Webpack: process.env.VAR_NAME
// Vite: import.meta.env.VITE_VAR_NAME

// 需要修改代码中的环境变量引用
// 或者使用插件兼容
import EnvironmentPlugin from 'vite-plugin-environment';

export default {
  plugins: [EnvironmentPlugin('all', { prefix: 'VITE_' })],
};
```

#### 3. 全局变量注入

```javascript
// Webpack: ProvidePlugin
// Vite: esbuild.inject

export default {
  esbuild: {
    define: {
      $: 'jquery',
      jQuery: 'jquery',
    },
  },
};
```

---

## 十、总结

Vite 作为新一代前端构建工具，以其极速的开发体验正在改变前端工程化的格局：

1. **核心理念**：利用浏览器原生 ESM，按需编译
2. **开发体验**：极速冷启动、闪电 HMR
3. **生产构建**：基于 Rollup，输出高质量产物
4. **生态发展**：插件生态快速发展，框架支持完善
5. **适用场景**：新项目首选，旧项目可渐进迁移

掌握 Vite 不仅是学习一个新工具，更是理解现代前端工程化的新范式。
