<template>
  <div>
    <h1>Hello Vue2!</h1>
  </div>
</template>

<script>
export default {
  name: "Vue2",
  data() {
    return {
      x: 0,
    };
  },
  methods: {
    addX() {
      this.x++;
    },
  },
  /* 使用readonly 来包装状态 x，使组件只能读取状态，不能修改状态 */
  computed: {
    x() {
      return 123;
    },
  },
  watch: {
    x(newVal, oldVal) {
      console.log(`x changed from ${oldVal} to ${newVal}`);
    },
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
};
</script>

<style lang="scss" scoped></style>
