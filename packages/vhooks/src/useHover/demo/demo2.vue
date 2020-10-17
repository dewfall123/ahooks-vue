<template>
  <div>
    <div
      id="divRef"
      style="width: 200px; height: 200px; background: rgba(0, 0, 0, 0.2)"
    ></div>

    isHovering: <span style="color: blue">{{ isHovering }}</span>
  </div>
</template>

<script lang="ts">
import { useHover } from '@dewfall/vhooks';

export default {
  setup() {
    const isHovering = useHover(() => document.getElementById('divRef'));

    return {
      isHovering,
    };
  },
};
</script>
