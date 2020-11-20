<template>
  <div ref="elementRef" style="padding: 16px; background: #fff">
    <div
      style="
        width: 300px;
        height: 180px;
        background: rgba(0, 1, 0, 0.1);
        margin-bottom: 10px;
      "
    />
    <button @click="toggleFull()">Click</button>
    <span> isFullscreen: {{ isFullscreen }}</span>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from 'ahooks-vue';
import { ref } from 'vue';

export default {
  setup() {
    const elementRef = ref(null);
    const { isFullscreen, toggleFull } = useFullscreen(elementRef);

    return {
      isFullscreen,
      toggleFull,
      elementRef,
    };
  },
};
</script>
