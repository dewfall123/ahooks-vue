<template>
  <div>isVisible: {{ visible }}</div>
</template>

<script lang="ts">
import { useDocumentVisibility } from '@dewfall/vhooks-vue2';
import { watch } from '@vue/composition-api';

export default {
  setup() {
    const visible = useDocumentVisibility();

    watch(visible, () => {
      console.log('current visible state =  ' + visible.value);
    });

    return {
      visible,
    };
  },
};
</script>
