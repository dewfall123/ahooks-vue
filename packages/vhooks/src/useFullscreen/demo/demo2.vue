<template>
  <div id="container" style="padding: 16px; background: #fff">
    <div
      style="
        width: 300px;
        height: 180px;
        background: rgba(0, 1, 0, 0.1);
        margin-bottom: 10px;
      "
    />
    <button @click="setFull()">全屏</button>
    <button @click="exitFull()">缩小</button>
    <button @click="toggleFull()">切换</button>
    <span> isFullscreen: {{ isFullscreen }}</span>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from '@dewfall/vhooks';
export default {
  setup() {
    const { isFullscreen, toggleFull, setFull, exitFull } = useFullscreen(() =>
      document.getElementById('container'),
    );

    return {
      isFullscreen,
      toggleFull,
      setFull,
      exitFull,
    };
  },
};
</script>
