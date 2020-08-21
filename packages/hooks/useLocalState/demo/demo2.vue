<template>
  <div>
    <input v-model="form.name" />
    <input v-model="form.age" />
  </div>
</template>

<script lang="ts">
import { useLocalState } from '@dewfall/vhooks';

export default {
  setup() {
    const form = useLocalState('user-form', {
      name: 'dendi',
      age: 18,
    });

    return {
      form,
    };
  },
};
</script>
