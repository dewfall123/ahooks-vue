<template>
  <div>
    <input v-model="conditions.field1" />
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useLocalforage } from 'ahooks-vue';

export default {
  async setup() {
    const conditions = reactive({
      field1: await useLocalforage('field1', 'hello world!'),
    });

    return {
      conditions,
    };
  },
};
</script>
