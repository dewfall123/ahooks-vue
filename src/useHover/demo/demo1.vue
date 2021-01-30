<template>
  <div>
    <div
      ref="divRef"
      style="width: 200px; height: 200px; background: rgba(0, 0, 0, 0.2)"
    ></div>

    isHovering: <span style="color: blue">{{ isHovering }}</span>
  </div>
</template>

<script lang="ts">
import { useHover } from 'ahooks-vue';
import { ref } from 'vue';

export default {
  setup() {
    const divRef = ref(null);
    const isHovering = useHover(divRef);

    return {
      isHovering,
      divRef,
    };
  },
};
</script>
