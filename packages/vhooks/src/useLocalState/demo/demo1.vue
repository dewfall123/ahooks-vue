<template>
  <div>
    <input v-model="conditions.field1" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useLocalState } from '@dewfall/vhooks';

export default {
  setup() {
    const conditions = reactive({
      field1: useLocalState('field1', 'hellow word!'),
    });

    return {
      conditions,
    };
  },
};
</script>
