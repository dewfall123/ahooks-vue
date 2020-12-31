<template>
  <div>
    <button
      v-for="(i, index) of Array(Math.ceil(total / pageSize))"
      :key="index"
      @click="changeCurrent(index + 1)"
      :style="{
        marginRight: '4px',
        color: current === index + 1 ? '#407cff' : '',
      }"
    >
      {{ index + 1 }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    total: Number,
    current: Number,
    pageSize: { type: Number, default: 10 },
  },
  emits: ['update:current'],
  setup(props, { emit }) {
    function changeCurrent(index: number) {
      if (index !== props.current) {
        emit('update:current', index);
      }
    }
    return {
      changeCurrent,
    };
  },
};
</script>
