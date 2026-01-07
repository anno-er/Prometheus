/* 
  定义一个Vue Composition API，用于管理全局状态 组合式函数
   - 返回的对象包含了定义的状态和方法
   - 可以在组件中通过 useExample() 来获取该对象实例
   - 可以在组件中通过 addX() 来调用方法 addX
   - 可以在组件中通过 x.value 来批量更新状态
*/

import { ref } from "vue";
export const useExample = () => {
  const x = ref(0);
  const addX = () => {
    x.value++;
  };

  return {
    x,
    addX,
  };
};
