<template>
  <div @click="onClick">Example---{{ msg }}</div>
  <slot></slot>
  <slot name="header"></slot>
</template>

<script setup lang="ts">
defineOptions({
  name: "Example",
});
const props = defineProps({
  msg: {
    type: String,
    default: "hello expample",
  },
});

const emit = defineEmits(["change"]);

const onClick = () => {
  emit("change", "点击了Example组件");
};
</script>

<style lang="scss" scoped></style>
