<template>
  <div>
    <p>{{ state }}</p>
    <button @click="addCount()">count++</button>
    <button @click="subCount()">count--</button>
  </div>
</template>

<script lang="ts" setup>
import { useUrlState } from 'ahooks-vue';

const routerPushFn = (s: string) => (location.hash = s);

const DefaultState = { count: 0, page: 1 };

const state = useUrlState(routerPushFn, DefaultState, {
  localStorageKey: 'localStorageKey',
});

const addCount = () => state.value.count++;
const subCount = () => state.value.count--;
</script>
