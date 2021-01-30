<template>
  <div>
    <p>
      UserName: <span>{{ loading ? 'loading' : data }}</span>
    </p>
    <button @click="run()" style="margin-right: 8px">run</button>
    <button @click="cancel">cancel</button>
  </div>
</template>

<script lang="ts">
import { useRequest } from 'ahooks-vue';
import { getFullName } from './utils';

export default {
  setup() {
    const { data, loading, error, run, cancel } = useRequest(getFullName, {
      pollingInterval: 1 * 1000,
      pollingWhenHidden: true,
    });

    return {
      data,
      loading,
      error,
      run,
      cancel,
    };
  },
};
</script>
