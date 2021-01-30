<template>
  <div>
    <input v-model="form.name" style="margin-right: 16px" />
    <input v-model="form.age" />
  </div>
</template>

<script lang="ts">
import { useLocalStorageState } from 'ahooks-vue';

export default {
  setup() {
    const form = useLocalStorageState('user-form', {
      name: 'dendi',
      age: 18,
    });

    return {
      form,
    };
  },
};
</script>
