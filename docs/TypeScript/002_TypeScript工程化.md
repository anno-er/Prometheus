# TypeScript工程化

## 1. TypeScript 校验实现

TypeScript 校验是确保代码类型安全的核心机制，在项目中实现 TypeScript 校验需要以下步骤：

### 1.1 安装 TypeScript

首先需要在项目中安装 TypeScript：

```bash
# 使用 npm
npm install typescript --save-dev

# 使用 yarn
yarn add typescript --dev

# 使用 pnpm
pnpm add typescript --save-dev
```

### 1.2 初始化 TypeScript 配置文件

运行以下命令生成基本的 `tsconfig.json` 文件：

```bash
ts --init
```

### 1.3 配置构建工具集成

根据项目使用的构建工具，需要进行相应配置：

#### 1.3.1 Webpack 集成

安装 Webpack 的 TypeScript 加载器：

```bash
npm install ts-loader --save-dev
```

在 `webpack.config.js` 中配置：

```javascript
module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

#### 1.3.2 Vite 集成

Vite 内置对 TypeScript 的支持，只需安装 TypeScript：

```bash
npm install typescript --save-dev
```

创建 `tsconfig.json` 即可使用。

#### 1.3.3 Rollup 集成

安装 Rollup 的 TypeScript 插件：

```bash
npm install @rollup/plugin-typescript --save-dev
```

在 `rollup.config.js` 中配置：

```javascript
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [typescript()],
};
```

### 1.4 配置 ESLint 进行代码校验

安装 ESLint 和 TypeScript ESLint 插件：

```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

创建 `.eslintrc.js` 配置文件：

```javascript
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "@typescript-eslint/recommended"],
  rules: {
    // 自定义规则
  },
};
```

### 1.5 IDE 集成

确保使用支持 TypeScript 的 IDE（如 VS Code），并安装相关插件：

- VS Code：TypeScript and JavaScript Language Features（内置）
- 可选：ESLint 插件

### 1.6 运行类型检查

在 `package.json` 中添加脚本：

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "build": "tsc",
    "lint": "eslint src --ext .ts,.tsx"
  }
}
```

运行类型检查：

```bash
npm run type-check
```

### 1.7 CI/CD 集成

在 CI/CD 流程中添加 TypeScript 类型检查和 linting：

```yaml
# .github/workflows/ci.yml 示例
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"
      - run: npm install
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
```

## 2. TypeScript 配置文件详解

TypeScript 配置文件 `tsconfig.json` 用于指定 TypeScript 编译器的行为。以下是主要配置项的详细说明：

### 2.1 顶级配置项

#### `compilerOptions`

编译器选项，用于配置 TypeScript 编译行为的核心配置项。

#### `include`

指定需要编译的文件或目录，支持 glob 模式：

```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

#### `exclude`

指定不需要编译的文件或目录，优先级高于 `include`：

```json
{
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

#### `files`

显式指定需要编译的文件列表，优先级高于 `include` 和 `exclude`：

```json
{
  "files": ["src/main.ts", "src/index.ts"]
}
```

#### `references`

用于项目引用，支持 monorepo 结构：

```json
{
  "references": [
    { "path": "./tsconfig.shared.json" },
    { "path": "./packages/utils" }
  ]
}
```

### 2.2 compilerOptions 详解

#### 目标与模块

- `target`: 指定编译后的 JavaScript 版本（ES3, ES5, ES2015-ES2022, ESNext）

  ```json
  { "target": "ES2020" }
  ```

- `module`: 指定模块系统（CommonJS, AMD, System, UMD, ES2015-ES2022, ESNext, Node12, NodeNext）

  ```json
  { "module": "ESNext" }
  ```

- `lib`: 指定编译时包含的库文件（DOM, ES2020, WebWorker 等）

  ```json
  { "lib": ["ES2020", "DOM", "DOM.Iterable"] }
  ```

- `moduleResolution`: 指定模块解析策略（node, node12, nodenext, classic）
  ```json
  { "moduleResolution": "node" }
  ```

#### 输出配置

- `outDir`: 指定编译后的文件输出目录

  ```json
  { "outDir": "./dist" }
  ```

- `rootDir`: 指定源文件的根目录

  ```json
  { "rootDir": "./src" }
  ```

- `declaration`: 是否生成 .d.ts 声明文件

  ```json
  { "declaration": true }
  ```

- `declarationMap`: 是否为声明文件生成源映射

  ```json
  { "declarationMap": true }
  ```

- `sourceMap`: 是否生成源映射文件

  ```json
  { "sourceMap": true }
  ```

- `outFile`: 将所有输出文件合并为一个文件（仅适用于 AMD 或 System 模块）
  ```json
  { "outFile": "./dist/bundle.js" }
  ```

#### 严格模式

- `strict`: 启用所有严格类型检查选项

  ```json
  { "strict": true }
  ```

- `strictNullChecks`: 启用严格的 null 和 undefined 检查

  ```json
  { "strictNullChecks": true }
  ```

- `strictFunctionTypes`: 启用函数参数的严格类型检查

  ```json
  { "strictFunctionTypes": true }
  ```

- `strictBindCallApply`: 启用对 bind, call, apply 方法的严格类型检查

  ```json
  { "strictBindCallApply": true }
  ```

- `strictPropertyInitialization`: 启用类属性初始化的严格检查

  ```json
  { "strictPropertyInitialization": true }
  ```

- `noImplicitAny`: 不允许隐式的 any 类型

  ```json
  { "noImplicitAny": true }
  ```

- `noImplicitThis`: 不允许隐式的 this 类型

  ```json
  { "noImplicitThis": true }
  ```

- `alwaysStrict`: 在编译后的 JavaScript 文件中添加 "use strict"
  ```json
  { "alwaysStrict": true }
  ```

#### 额外检查

- `noUnusedLocals`: 检查未使用的局部变量

  ```json
  { "noUnusedLocals": true }
  ```

- `noUnusedParameters`: 检查未使用的参数

  ```json
  { "noUnusedParameters": true }
  ```

- `noImplicitReturns`: 检查函数是否有所有路径都返回值

  ```json
  { "noImplicitReturns": true }
  ```

- `noFallthroughCasesInSwitch`: 检查 switch 语句是否有贯穿情况

  ```json
  { "noFallthroughCasesInSwitch": true }
  ```

- `noUncheckedIndexedAccess`: 对数组和对象索引访问进行严格检查
  ```json
  { "noUncheckedIndexedAccess": true }
  ```

#### 模块解析

- `baseUrl`: 用于解析非相对模块名称的基础目录

  ```json
  { "baseUrl": "./src" }
  ```

- `paths`: 模块路径映射，与 baseUrl 配合使用

  ```json
  {
    "paths": {
      "@/*": ["*"],
      "@components/*": ["components/*"]
    }
  }
  ```

- `rootDirs`: 指定多个根目录，用于解析非相对模块名称

  ```json
  { "rootDirs": ["./src", "./tests"] }
  ```

- `typeRoots`: 指定类型定义文件的搜索目录

  ```json
  { "typeRoots": ["./node_modules/@types", "./src/types"] }
  ```

- `types`: 指定需要包含的类型定义包
  ```json
  { "types": ["node", "jest"] }
  ```

#### JSX 相关

- `jsx`: 指定 JSX 处理方式（preserve, react, react-native, react-jsx, react-jsxdev）

  ```json
  { "jsx": "react-jsx" }
  ```

- `jsxFactory`: 指定 JSX 工厂函数（默认 React.createElement）

  ```json
  { "jsxFactory": "h" }
  ```

- `jsxFragmentFactory`: 指定 JSX 片段工厂函数（默认 React.Fragment）
  ```json
  { "jsxFragmentFactory": "Fragment" }
  ```

#### 其他选项

- `allowJs`: 是否允许编译 JavaScript 文件

  ```json
  { "allowJs": true }
  ```

- `checkJs`: 是否对 JavaScript 文件进行类型检查

  ```json
  { "checkJs": true }
  ```

- `allowSyntheticDefaultImports`: 是否允许从没有默认导出的模块进行默认导入

  ```json
  { "allowSyntheticDefaultImports": true }
  ```

- `esModuleInterop`: 启用 ES 模块互操作性，允许 CommonJS 和 ES 模块之间的无缝交互

  ```json
  { "esModuleInterop": true }
  ```

- `skipLibCheck`: 是否跳过对声明文件的类型检查

  ```json
  { "skipLibCheck": true }
  ```

- `forceConsistentCasingInFileNames`: 是否强制文件名大小写一致

  ```json
  { "forceConsistentCasingInFileNames": true }
  ```

- `resolveJsonModule`: 是否允许导入 JSON 文件
  ```json
  { "resolveJsonModule": true }
  ```

### 2.3 示例配置

以下是一个完整的 `tsconfig.json` 示例，适用于现代前端项目：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    },
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

## 3. 最佳实践

### 3.1 渐进式迁移

对于现有 JavaScript 项目，可以逐步迁移到 TypeScript：

1. 先启用 `allowJs: true` 和 `checkJs: false`
2. 逐步为关键文件添加 `.ts` 扩展名
3. 逐步启用严格模式选项

### 3.2 类型定义管理

- 使用 `@types/*` 包获取第三方库的类型定义
- 为没有类型定义的库创建自定义类型定义文件
- 保持类型定义与实际代码同步

### 3.3 性能优化

- 对于大型项目，考虑使用项目引用（Project References）拆分代码
- 使用 `skipLibCheck: true` 加速编译
- 合理使用 `include` 和 `exclude` 减少需要编译的文件数量

### 3.4 CI/CD 集成

将 TypeScript 类型检查和 linting 集成到 CI/CD 流程中，确保代码质量：

- 在提交前运行类型检查
- 在 PR 阶段进行类型检查和 linting
- 构建时启用类型检查

## 总结

TypeScript 工程化是现代前端开发的重要组成部分，通过合理配置 TypeScript 编译器和集成到开发流程中，可以显著提高代码质量和开发效率。本文详细介绍了 TypeScript 校验的实现方法和 tsconfig.json 配置项的意义，希望能帮助开发者更好地理解和应用 TypeScript。
