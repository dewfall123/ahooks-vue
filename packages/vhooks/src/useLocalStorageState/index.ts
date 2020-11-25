import { Ref, ref, watch } from 'vue-demi';

export type LocalStateKey = string;

export function useLocalStorageState<T = undefined>(
  key: string,
): Ref<T | undefined>;

export function useLocalStorageState<T = any>(
  key: string,
  defaultValue: T | (() => T),
): Ref<T>;

export function useLocalStorageState<T = any>(
  key: LocalStateKey,
  defaultValue?: T | (() => T),
) {
  const state = ref(getState()) as Ref<T | undefined>;

  function getState(): T | undefined {
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        //
      }
    }
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    }
    return defaultValue;
  }

  function setState() {
    localStorage.setItem(key, JSON.stringify(state.value));
  }

  watch(
    state,
    () => {
      setState();
    },
    { deep: true, immediate: false },
  );

  return state;
}

export default useLocalStorageState;
