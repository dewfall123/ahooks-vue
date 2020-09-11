<template>
  <div>
    <div style="width: 400px; height: 20px; position: relative;">
      <div
        style="width: 10px; height: 10px; background: #666;"
        class="move"
      ></div>
    </div>

    <p>
      {{ sorting }} worker status: <span style="color: blue">{{ status }}</span>
    </p>

    <div>
      <button @click="sort" style="margin-right: 16px;">排序</button>
      <button @click="sortInWorker">在worker里排序</button>
    </div>
  </div>
</template>

<style>
.move {
  position: absolute;
  animation: move 4s infinite linear;
  left: 0;
}

@keyframes move {
  0% {
    left: 0px;
  }
  50% {
    left: 400px;
  }
  0% {
    left: 0px;
  }
}
</style>

<script lang="ts">
import { useWorkerFunction } from '@dewfall/vhooks';
import { ref } from 'vue';

function randomArray(n: number = 100 * 10000) {
  return [...new Array(n)].map(() => Math.random() * n);
}

function sortArray(array: number[]) {
  return array.sort();
}

export default {
  setup() {
    const array = randomArray();
    const sorting = ref(false);

    const { callWokerFn, status } = useWorkerFunction(sortArray);

    function sortInWorker() {
      sorting.value = true;
      console.time('worker排序');
      callWokerFn([...array]).then(() => {
        sorting.value = false;
        console.timeEnd('worker排序');
      });
    }

    function sort() {
      sorting.value = true;
      console.time('主线程排序');
      sortArray([...array]);
      console.timeEnd('主线程排序');
      sorting.value = false;
    }

    return {
      sort,
      sortInWorker,
      status,
      sorting,
    };
  },
};
</script>
