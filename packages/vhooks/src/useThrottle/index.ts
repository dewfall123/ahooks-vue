import { Ref, watch, ref, computed, ComputedRef } from 'vue-demi';
import { throttle } from 'lodash-es';

export interface ThrottleOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
}

export declare type ComputedGetter<T> = (ctx?: any) => T;

export function useThrottle<T>(
  value: Ref<T> | ComputedGetter<T>,
  options?: ThrottleOptions,
) {
  let targetValue: Ref<T> | ComputedRef<T>;
  if (typeof value === 'function') {
    targetValue = computed(value);
  } else {
    targetValue = value;
  }

  const throttledValue = ref<T>(targetValue.value);

  const setValue = throttle(
    () => {
      // TODO
      throttledValue.value = targetValue.value as any;
    },
    options?.wait ?? 1000,
    options,
  );

  watch(targetValue, setValue);

  return throttledValue;
}
