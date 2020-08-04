---
title: vhooks
---

# Hello VuePress!

## title

::: tip
测试内容
:::

<demo src="./packages/hooks/use-toggle/demo/use-toggle.vue" language="vue" ></demo>


```vue
<template>
  <div>
    <p>{{ state }}</p>
    <button @click="toggle()">点击</button>
  </div>
</template>

<script lang="ts">
import { useToggle } from '../../../';

export default {
  setup() {
    const { state, toggle } = useToggle();

    return {
      state,
      toggle,
    };
  },
};
</script>
```