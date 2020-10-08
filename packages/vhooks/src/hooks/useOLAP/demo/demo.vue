<template>
  <div></div>
</template>

<script lang="ts">
import { useOLAP } from '@dewfall/vhooks';
import { data } from './data';

export default {
  setup() {
    const { cube, cubeSettings } = useOLAP(data);

    return {
      cube,
      cubeSettings,
    };
  },
};
</script>
