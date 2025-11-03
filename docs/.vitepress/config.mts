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
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/Examples/markdown-examples" },
      { text: "200 Hots", link: "/200 Hots/001_路由守卫" },
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
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
