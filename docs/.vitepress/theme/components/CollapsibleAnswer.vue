<template>
  <div class="collapsible-answer">
    <div v-if="title" class="answer-title">{{ title }}</div>
    <div v-show="!isCollapsed" class="answer-content">
      <slot></slot>
    </div>
    <div class="toggle-wrapper">
      <button @click="toggle" class="toggle-button">
        <span v-if="isCollapsed">▼</span>
        <span v-else>▲</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollapsibleAnswer",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 默认折叠状态
      isCollapsed: true,
    };
  },
  methods: {
    toggle() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style scoped>
.collapsible-answer {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  background-color: #f8fafc;
}

.answer-title {
  font-weight: bold;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.toggle-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.toggle-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.9rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-button:hover {
  background-color: #2980b9;
}

.answer-content {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}
</style>
