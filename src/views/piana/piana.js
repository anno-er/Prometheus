/* 
  定义一个Pinia store，用于管理全局状态
   - 返回的 store 是一个reactive 对象，包含了定义的状态和方法
   - 可以在组件中通过 useExampleStore() 来获取该 store 实例
   - 可以在组件中通过 store.x 来访问状态 x， store.x 指向的是 x.value
   - 可以在组件中通过 store.addX() 来调用方法 addX
   - const { x, addX } = store; x 会丢失响应式，因为store是一个reactive对象，而x是一个ref对象，需要通过x.value来访问
   - 可以在组件中通过 store.$reset() 来重置状态 x 为初始值 0
   - 可以在组件中通过 store.$patch() 来批量更新状态
   - 可以在组件中通过 store.$subscribe() 来订阅状态变化
   - 可以在组件中通过 store.$onAction() 来订阅 action 调用
   - 可以在组件中通过 store.$onAction().then() 来处理 action 调用完成后的逻辑
   - 可以在组件中通过 store.$onAction().catch() 来处理 action 调用失败后的逻辑
   - 可以在组件中通过 store.$onAction().finally() 来处理 action 调用完成后的逻辑，无论成功或失败
*/

import { defineStore } from "pinia";
import { ref, readonly } from "vue";

export const useExampleStore = defineStore("example", () => {
  const x = ref(0);
  function addX() {
    x.value++;
  }
  /* 使用readonly 来包装状态 x，使组件只能读取状态，不能修改状态 */
  return { x: readonly(x), addX };
});
