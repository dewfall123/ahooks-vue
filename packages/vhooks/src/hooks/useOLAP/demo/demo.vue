<template>
  <div></div>
</template>

<script lang="ts">
import { useCube } from '@dewfall/vhooks';
import { data } from './data';

export default {
  setup() {
    const { cube, cubeSettings } = useCube(data);

    return {
      cube,
      cubeSettings,
    };
  },
};
</script>
