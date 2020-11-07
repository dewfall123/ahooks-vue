<template>
  <div>
    <p>
      UserName: <span>{{ loading ? 'loading' : data }}</span>
    </p>
    <button @click="run">run</button>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@dewfall/vhooks';
import { getUsername } from './utils';

export default {
  setup() {
    const { data, loading, error, run } = useRequest(getUsername, {
      manual: true,
    });

    return {
      data,
      loading,
      error,
      run,
    };
  },
};
</script>
