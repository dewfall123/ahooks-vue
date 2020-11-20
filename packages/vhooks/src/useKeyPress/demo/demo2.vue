<template>
  <div>
    <p>Try pressing the following:</p>

    <div style="display: flex; flex-wrap: wrap">
      <span
        v-for="keyName of [...filterKey, ...CombinationKeys]"
        :key="keyName"
        :style="{
          padding: '4px 20px',
          margin: '8px',
          borderRadius: '2px',
          background:
            lastPressedKey === keyName
              ? 'rgba(62, 175, 124, 0.6)'
              : 'rgb(238, 238, 238)',
        }"
      >
        {{ keyName }}
      </span>
    </div>

    <p style="margin-left: 8px">
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

    // a s Backspace 0 1
    const filterKey = ['a', 's', 'Enter', '0', '1'];
    useKeyPress(filterKey, (event) => {
      setState(event.key);
    });

    const CombinationKeys = [
      'shift.c',
      'meta',
      'ctrl.alt.c',
      'ctrl.alt.space',
      'ctrl.alt.0',
    ];

    for (const key of CombinationKeys) {
      useKeyPress(key, () => {
        setState(key);
      });
    }

    return {
      lastPressedKey,
      filterKey,
      CombinationKeys,
    };
  },
};
</script>
