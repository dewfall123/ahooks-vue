<template>
  <div>
    <p>Try pressing the following:</p>

    <p>1. Press <span style="color: blue">ArrowUp</span> by key to increase</p>
    <p>
      2. Press <span style="color: blue">ArrowDown</span> by keyCode to decrease
      counter: 0
    </p>

    <p>
      count: <span style="color: #f00; font-size: 16px">{{ count }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { useKeyPress } from '@dewfall/vhooks';
import { ref } from 'vue';

export default {
  setup() {
    const count = ref(0);

    useKeyPress('ArrowUp', () => {
      count.value++;
    });

    // keyCode value for ArrowDown
    useKeyPress(40, () => {
      count.value--;
    });

    return {
      count,
    };
  },
};
</script>
