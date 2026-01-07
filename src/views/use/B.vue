<template>
  <div>
    <h1>Hello B!</h1>
    <p>x: {{ x }}</p>
    <button @click="addX">Add X</button>
  </div>
</template>

<script setup>
import { useExample } from "./exampleUse";
const { x, addX } = useExample();
</script>
