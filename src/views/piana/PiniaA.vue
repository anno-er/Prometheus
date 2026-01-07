<template>
  <div>
    <h1>Hello PiniaA!</h1>
    <p>Current X: {{ store.x }}</p>
    <button @click="store.x = 20">Add X</button>
  </div>
</template>

<script setup>
import { useExampleStore } from "./piana.js";
const store = useExampleStore();
const { x, addX } = store;
console.log("@@-->store", store);
</script>

<style lang="scss" scoped></style>
