<template>
  <div>
    <input v-model="conditions.field1" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useLocalStorageState } from 'ahooks-vue';

export default {
  setup() {
    const conditions = reactive({
      field1: useLocalStorageState('field1', 'hello world!'),
    });

    return {
      conditions,
    };
  },
};
</script>
