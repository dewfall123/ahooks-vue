import { reactive, toRefs, computed } from 'vue-demi';
import { SourceDataRef, OPERATOR, Filter, ColumnsRef } from './type';

export function useFilters<T>(data: SourceDataRef<T>, columns: ColumnsRef<T>) {
  const state = reactive({
    list: [] as Filter<T>[],
    cur: {
      field: '',
      operator: OPERATOR.等于,
      value: '',
    } as Filter<T>,
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
          .map(item => item[state.cur.field as keyof T])
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
        field: state.cur.field,
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
