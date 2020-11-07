<template>
  <div>
    <p>
      normal:
      <span>{{ loading ? 'loading' : data }}</span>
    </p>
    <p>
      loadingDelay:
      <span>{{ loadingWithDelay ? 'loading' : dataWithDelay }}</span>
    </p>
    <button @click="runAll">run</button>
  </div>
</template>

<script lang="ts">
import { useRequest } from '@dewfall/vhooks';
import { getNumber } from './utils';

export default {
  setup() {
    const { loading, run, data } = useRequest(getNumber, {});
    const {
      loading: loadingWithDelay,
      run: runWithDelay,
      data: dataWithDelay,
    } = useRequest(getNumber, {
      loadingDelay: 0.8 * 1000,
    });

    const runAll = () => {
      run();
      runWithDelay();
    };

    return {
      loading,
      data,
      loadingWithDelay,
      dataWithDelay,
      runAll,
    };
  },
};
</script>
