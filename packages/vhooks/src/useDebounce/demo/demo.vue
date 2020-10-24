<template>
  <div>
    <p>
      count: <span>{{ count }}</span>
    </p>
    <p>
      debouncedValue: <span>{{ debouncedValue }}</span>
    </p>
    <button @click="addCount">++count</button>
  </div>
</template>

<script lang="ts">
import { useDebounce } from '@dewfall/vhooks';
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const debouncedValue = useDebounce(count, { wait: 2000 });

    function addCount() {
      count.value++;
    }

    return {
      count,
      debouncedValue,
      addCount,
    };
  },
};
</script>
