<template>
  <div>
    <p>
      lastPressedKey:
      <span style="color: #f00; font-size: 16px">{{ lastPressedKey }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { useKeyPress } from 'ahooks-vue';
import { ref } from 'vue';

export default {
  setup() {
    const lastPressedKey = ref('');
    function setState(key: string) {
      lastPressedKey.value = key;
    }

    const Keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    useKeyPress(
      (event) => !Keys.includes(event.key),
      (event) => {
        setState(event.key);
      },
    );

    return {
      lastPressedKey,
    };
  },
};
</script>
