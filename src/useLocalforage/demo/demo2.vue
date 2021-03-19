<template>
  <Suspense>
    <div>
      <input v-model="form.name" style="margin-right: 16px" />
      <input v-model="form.age" />
    </div>
  </Suspense>
</template>

<script lang="ts">
import { useLocalforage } from 'ahooks-vue';

export default {
  async setup() {
    const form = await useLocalforage('user-form', {
      name: 'dendi',
      age: 18,
    });

    return {
      form,
    };
  },
};
</script>
