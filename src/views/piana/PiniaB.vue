<template>
  <div>
    <h1>Hello PiniaB!</h1>
    <p>Current X: {{ store.x }}</p>
    <button @click="store.addX">Add X</button>
  </div>
</template>

<script setup>
import { useExampleStore } from "./piana.js";
const store = useExampleStore();
</script>

<style lang="scss" scoped></style>
