import { reactive, toRefs, computed } from '@vue/composition-api';
import { SourceDataRef, Columns, OPERATOR, Filter } from './type';

export function useFilters(data: SourceDataRef, columns: Columns) {
  const state = reactive({
    list: [] as Filter[],
    cur: {
      field: '',
      operator: OPERATOR.等于,
      value: '',
    } as Filter,
  });

  const fieldOptions = computed(() => {
    return columns.value;
  });

  const operatorOptions = OPERATOR;

  const valueOptions = computed(() => {
    if (!state.cur.field) {
      return [];
    }
    return Array.from(
      new Set(
        data.value
          .map(item => item[(state.cur.field as unknown) as string])
          .filter(filedValue => filedValue !== undefined),
      ),
    );
  });

  function resetFilter() {
    state.cur.field = '';
    state.cur.operator = OPERATOR.等于;
    state.cur.value = '' as any;
  }

  const canAddFilter = computed(
    () => state.cur.field && state.cur.operator && state.cur.value,
  );

  function addFilter() {
    if (canAddFilter.value) {
      state.list.push({
        field: (state.cur.field as unknown) as string,
        operator: state.cur.operator,
        value: (state.cur.value as unknown) as string,
      });
      resetFilter();
    }
  }

  return {
    ...toRefs(state),
    fieldOptions,
    operatorOptions,
    valueOptions,
    //
    resetFilter,
    canAddFilter,
    addFilter,
  };
}
