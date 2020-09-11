<template>
  <div>
    <div
      ref="divRef"
      style="border: 1px solid rgba(0,0,0, 0.1); overflow: scroll;
        width: 100px; height: 100px;
        min-height: 30px; min-width: 30px; resize: both;"
    ></div>

    <p>
      size.width: <span style="color: blue">{{ size.width }}</span>
    </p>
    <p></p>
    <p>
      size.height: <span style="color: blue">{{ size.height }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { useSize } from '@dewfall/vhooks-vue2';
import { ref } from '@vue/composition-api';

export default {
  setup() {
    const divRef = ref(null);
    const size = useSize(divRef);

    return {
      divRef,
      size,
    };
  },
};
</script>
