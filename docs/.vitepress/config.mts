import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PROMETHEUS",
  description: "Hope is more enduring than any suffering.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3], // 显示二级和三级标题
      label: "目录", // 可选：自定义目录标题
    },
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/Examples/markdown-examples" },
      { text: "200 Hots", link: "/200 Hots/001_路由守卫" },
      { text: "TypeScript", link: "/Typescript/001_Basic" },
      { text: "Vue", link: "/Vue/001_Basic" },
    ],

    sidebar: {
      "/Examples/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/Examples/markdown-examples" },
            { text: "Runtime API Examples", link: "/Examples/api-examples" },
          ],
        },
      ],
      "/200 Hots/": [
        {
          text: "200 Hots",
          items: [
            { text: "路由守卫", link: "/200 Hots/001_路由守卫" },
            {
              text: "加载性能和渲染性能",
              link: "/200 Hots/002_加载性能和渲染性能",
            },
            { text: "Node 循环机制", link: "/200 Hots/003_Node循环机制" },
            { text: "HTTP/HTTPS", link: "/200 Hots/004_HTTP" },
            {
              text: "Cookie、Session、Token",
              link: "/200 Hots/005_Cookie、Session、Token",
            },
            { text: "原型模式与原型链", link: "/200 Hots/006_原型模式.md" },
            { text: "设计模式", link: "/200 Hots/007_设计模式.md" },
            { text: "Src & Herf", link: "/200 Hots/008_src与herf.md" },
            { text: "DOCTYPE", link: "/200 Hots/009_DOCTYPE文档类型" },
            { text: "Meta", link: "/200 Hots/010_Meta标签" },
            { text: "HTML5", link: "/200 Hots/011_HTML5" },
            { text: "Srcset", link: "/200 Hots/012_srcset" },
            {
              text: "Inline-Block-Empty",
              link: "/200 Hots/013_inline-block-empty",
            },
            {
              text: "Title & H1",
              link: "/200 Hots/014_title-h1",
            },
            {
              text: "Canvas & SVG",
              link: "/200 Hots/015_canvas-svg",
            },
            {
              text: "CSS选择器与优先级",
              link: "/200 Hots/016_CSS选择器与优先级",
            },
            {
              text: "CSS属性继承",
              link: "/200 Hots/017_CSS属性继承",
            },
            {
              text: "Display",
              link: "/200 Hots/018_display",
            },
            {
              text: "CSS link & @import",
              link: "/200 Hots/019_link-@import",
            },
            {
              text: "Transform",
              link: "/200 Hots/020_transform",
            },
            {
              text: "CSS Sprites",
              link: "/200 Hots/021_Sprites",
            },
            {
              text: "CSS 性能优化",
              link: "/200 Hots/022_CSS性能优化",
            },
            {
              text: "完美视口",
              link: "/200 Hots/023_完美视口",
            },
            {
              text: "ES6 新特性",
              link: "/200 Hots/024_ES6新特性",
            },
            {
              text: "RequestAnimationFrame",
              link: "/200 Hots/025_RequestAnimationFrame",
            },
            {
              text: "WebWorker",
              link: "/200 Hots/026_WebWorker",
            },
          ],
        },
      ],
      "/TypeScript/": [
        {
          text: "TypeScript",
          items: [{ text: "Basic", link: "/TypeScript/001_Basic" }],
        },
      ],
      "/Vue/": [
        {
          text: "Vue",
          items: [
            { text: "Basic", link: "/Vue/001_Basic" },
            { text: "Pinia", link: "/Vue/003_Pinia" },
            { text: "Vuex", link: "/Vue/004_Vuex" },
            { text: "Vue 进阶", link: "/Vue/005_Vue%E8%BF%9B%E9%98%B6" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
