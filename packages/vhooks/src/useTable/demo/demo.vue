<template>
  <div>
    <div style="margin-bottom: 12px">
      <input v-model="search.text" placeholder="search" />
    </div>
    <MyTable :columns="columns" :data="pagedData" :sort="sort"></MyTable>
    <Pagination v-model="page.index" :total="total" :size="page.size" />
  </div>
</template>

<script lang="ts">
import MyTable from './table.vue';
import Pagination from './pagination.vue';
import { data, columns } from './data';
import { useTable } from '@dewfall/vhooks';

export default {
  components: {
    MyTable,
    Pagination,
  },
  setup() {
    const { pagedData, page, total, search, sort } = useTable(data, {
      page: { size: 5 },
      sort: {
        key: 'score',
        direction: 'descend',
      },
    });

    return { pagedData, page, total, columns, search, sort };
  },
};
</script>
