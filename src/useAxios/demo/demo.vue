<template>
  <div>
    Result: <span>{{ loading ? 'loading' : data }}</span>
  </div>
</template>

<script lang="ts">
import { useAxios } from 'ahooks-vue';

export default {
  setup() {
    const { data, error, loading } = useAxios(
      () => ({
        url: 'https://api.apishop.net/common/jieqi/Get24Jieqi',
      }),
      {
        formatResult: (data: any) => data.data,
      },
    );

    return { data, error, loading };
  },
};
</script>
