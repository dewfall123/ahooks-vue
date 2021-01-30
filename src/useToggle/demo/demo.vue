<template>
  <div>
    <p>{{ state }}</p>
    <button @click="toggle()">点击</button>
  </div>
</template>

<script lang="ts">
import { useToggle } from 'ahooks-vue';

export default {
  setup() {
    const { state, toggle } = useToggle();

    return {
      state,
      toggle,
    };
  },
};
</script>
