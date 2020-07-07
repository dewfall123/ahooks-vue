<template>
  <div>
    <p>{{ state }}</p>
    <button @click="toggle">点击</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useToggle } from '../../../';

export default defineComponent({
  setup() {
    const { state, toggle } = useToggle();
    return {
      state,
      toggle,
    };
  },
});
</script>
