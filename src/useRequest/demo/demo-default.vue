<template>
  <div>
    UserName: <span>{{ loading ? 'loading' : data }}</span>
  </div>
</template>

<script lang="ts">
import { useRequest } from 'ahooks-vue';

function getFullName(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        Math.random()
          .toString(36)
          .slice(2),
      );
    }, 1.5 * 1000);
  });
}

export default {
  setup() {
    const { data, error, loading } = useRequest(getFullName);

    return { data, error, loading };
  },
};
</script>
