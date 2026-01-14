<template>
  <!-- 使用 ref 代替 id，更符合 Vue 规范且避免全局冲突 -->
  <div ref="hocContainer" id="hoc"></div>
  <button @click="test">Test</button>
  {{ mode }}
</template>

<script setup lang="ts">
import { ref, onMounted, h, render, getCurrentInstance, watch } from "vue";
import type { VNode } from "vue";
import Example from "./Example.vue";

// 定义容器引用
const hocContainer = ref<HTMLElement | null>(null);
// 获取当前组件实例，用于获取 appContext
const instance = getCurrentInstance();

const mode = ref("example");

// 监听 mode 变化，自动重新渲染
watch(mode, () => {
  innerRender();
});

const test = () => {
  mode.value = mode.value === "example" ? "div" : "example";
};

const innerRender = () => {
  if (!hocContainer.value) return;
  const renderCom = mode.value === "example" ? Example : "div";
  const vNode: VNode = h(
    renderCom,
    {
      msg: "hello hoc",
      onChange: (newMsg: string) => {
        console.log("收到组件消息:", newMsg);
      },
      class: "custom",
      id: "hoc-inner-div",
    },
    {
      default: () => "默认插槽内容",
      header: () => "header 插槽内容",
    }
  );

  // 关键：关联当前应用的上下文（如果组件用到了全局插件则必须）
  if (instance) {
    vNode.appContext = instance.appContext;
  }

  // 执行渲染
  render(vNode, hocContainer.value);
};

onMounted(() => {
  innerRender();
});
</script>

<style scoped>
/* 确保容器有高度，方便观察 */
#hoc {
  min-height: 20px;
  border: 1px dashed #ccc;
}
</style>
