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
    <button @click="setFull()" style="margin-right: 16px">setFull</button>
    <button @click="exitFull()" style="margin-right: 16px">exitFull</button>
    <button @click="toggleFull()">toggleFull</button>
    <span> isFullscreen: {{ isFullscreen }}</span>
  </div>
</template>

<script lang="ts">
import { useFullscreen } from 'ahooks-vue';
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
