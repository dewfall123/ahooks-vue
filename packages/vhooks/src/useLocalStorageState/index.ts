import { ref, watch } from 'vue-demi';

export type LocalStateKey = string;

export function useLocalStorageState<T>(
  key: LocalStateKey,
  defaultValue?: T | (() => T),
) {
  const state = ref<T | undefined | null>(getState());

  function getState() {
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
    return defaultValue as T;
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
