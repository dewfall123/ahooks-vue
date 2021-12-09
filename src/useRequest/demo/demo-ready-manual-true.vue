<template>
  <div>
    <div>
      <button @click="toggle()">toggle-ready</button>
      <span style="margin-left: 8px;">ready: {{ ready }}</span>
    </div>
    <p>
      UserName: <span>{{ loading ? 'loading' : data }}</span>
    </p>
    <button @click="run()">run</button>
  </div>
</template>

<script lang="ts" setup>
import { useRequest, useToggle } from 'ahooks-vue';
import { getFullName } from './utils';

const { state: ready, toggle } = useToggle();

const { data, loading, run } = useRequest(getFullName, {
  manual: true,
  ready,
});
</script>
