<template>
  <div>
    <p>
      count: <span>{{ count }}</span>
    </p>
    <p>
      throlledCount: <span>{{ throlledCount }}</span>
    </p>
    <button @click="addCount">++count</button>
  </div>
</template>

<script lang="ts">
import { useThrottle } from '@dewfall/vhooks';
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const throlledCount = useThrottle(count, 2000);

    function addCount() {
      count.value++;
    }

    return {
      count,
      throlledCount,
      addCount,
    };
  },
};
</script>
