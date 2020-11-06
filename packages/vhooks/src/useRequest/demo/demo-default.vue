<template>
  <div>
    UserName: <span>{{ data }}</span>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@dewfall/vhooks';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random().toString(36).slice(2));
    }, 1000);
  });
}

export default {
  setup() {
    const { data, error, loading } = useRequest(getUsername);

    return { data, error, loading };
  },
};
</script>
