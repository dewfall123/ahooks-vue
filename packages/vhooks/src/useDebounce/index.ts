import { debounce } from 'lodash-es';
import { computed, ComputedRef, ref, Ref, watch } from 'vue-demi';

export interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

declare type ComputedGetter<T> = (ctx?: any) => T;

export function useDebounce<T>(
  value: Ref<T> | ComputedGetter<T>,
  options?: DebounceOptions,
) {
  let targetValue: Ref<T> | ComputedRef<T>;
  if (typeof value === 'function') {
    targetValue = computed(value);
  } else {
    targetValue = value;
  }

  const debouncedValue = ref<T>(targetValue.value);

  const setValue = debounce(
    () => {
      // TODO
      debouncedValue.value = targetValue.value as any;
    },
    options?.wait ?? 1000,
    options,
  );

  watch(targetValue, setValue);

  return debouncedValue;
}
