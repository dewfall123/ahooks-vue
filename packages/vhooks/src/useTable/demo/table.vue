<template>
  <div
    :style="{
      display: 'grid',
      gridTemplateColumns: `repeat(${Object.keys(columns).length}, 1fr)`,
    }"
  >
    <!-- columns -->
    <span
      v-for="(name, key) in columns"
      :key="key"
      class="column sortable-header"
    >
      {{ name }}
      <SortIcon
        :class="['icon', sort.key === key ? 'active' : '', sort.direction]"
        @click="
          onHeaderClick(key, sort.direction === 'ascend' ? 'descend' : 'ascend')
        "
      />
    </span>
    <template v-for="(item, index) of data">
      <span v-for="(name, field) in columns" :key="field + index" class="row">
        {{ item[field] }}
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { Sort, SortDirection } from '..';
import SortIcon from './sort-icon.vue';

export default {
  components: {
    SortIcon,
  },
  props: {
    columns: Object,
    data: Array,
    sort: Object,
  },
  setup(props) {
    function onHeaderClick(key: string, direction: SortDirection) {
      (props.sort as Sort).key = key;
      (props.sort as Sort).direction = direction;
    }

    return { onHeaderClick };
  },
};
</script>

<style scoped>
.column {
  color: #333;
  font-weight: 500;
  border: 1px solid #ddd;
  padding: 4px 6px;
  border: 1px solid #e8e8e8;
  text-align: center;
  padding-left: 12px;
}

.row {
  color: rgba(0, 0, 0, 0.65);
  border: 1px solid #e8e8e8;
  padding: 4px 6px;
  text-align: center;
}

.sortable-header {
  display: flex;
  justify-content: center;
}

.icon {
  visibility: hidden;
  cursor: pointer;
  color: #ddd;
  margin: 6px 0 0 4px;
}

.sortable-header:hover .icon {
  visibility: unset;
}

.icon.active {
  visibility: unset;
  color: #666;
}

.ascend {
  transform: rotate(180deg);
}
</style>
