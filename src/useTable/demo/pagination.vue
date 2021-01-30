<template>
  <div style="display: flex; margin: 10px 0">
    <div
      v-for="(i, indexI) of Array(totalPage)"
      :class="['page-item', modelValue === indexI + 1 ? 'active' : '']"
      :key="indexI"
      @click="onClick(indexI + 1)"
    >
      {{ indexI + 1 }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
export default {
  props: {
    modelValue: Number,
    total: Number,
    size: Number,
  },
  setup(props, { emit }) {
    function onClick(n: number) {
      emit('update:modelValue', n);
    }
    const totalPage = computed(() => Math.ceil(props.total! / props.size!));

    return { onClick, totalPage };
  },
};
</script>

<style scoped>
.page-item {
  cursor: pointer;
  padding: 4px 12px;
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #d9d9d9;
  margin: 0 8px 8px 0;
  border-radius: 4px;
  font-size: 12px;
}

.page-item:hover,
.active {
  color: #1890ff;
  border-color: #1890ff;
}
</style>
