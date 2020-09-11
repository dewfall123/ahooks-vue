<template>
  <div>
    <div
      ref="divRef"
      style="width: 200px; height: 200px; background: rgba(0,0,0, 0.2)"
    ></div>

    isHovering: <span style="color: blue">{{ isHovering }}</span>
  </div>
</template>

<script lang="ts">
import { useHover } from '@dewfall/vhooks-vue2';
import { ref } from '@vue/composition-api';

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
