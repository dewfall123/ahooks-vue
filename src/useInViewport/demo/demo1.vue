<template>
  <div>
    <div
      ref="divRef"
      style="
        width: 100px;
        height: 100px;
        background: rgba(0, 0, 0, 0.1);
        margin-bottom: 300px;
      "
    ></div>
    isInViewport: <span style="color: blue">{{ isInViewport }}</span>
  </div>
</template>

<script lang="ts">
import { useInViewport } from 'ahooks-vue';
import { ref } from 'vue';

export default {
  setup() {
    const divRef = ref(null);
    const isInViewport = useInViewport(divRef);

    return {
      divRef,
      isInViewport,
    };
  },
};
</script>
