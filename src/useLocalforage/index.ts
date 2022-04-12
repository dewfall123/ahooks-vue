import { Ref, ref, watch } from 'vue-demi';
import localforage from 'localforage';

export type LocalforageKey = string;

export async function useLocalforage<T = undefined>(
  key: string,
): Promise<Ref<T | undefined>>;

export async function useLocalforage<T = any>(
  key: string,
  defaultValue: T | (() => T),
): Promise<Ref<T>>;

export async function useLocalforage<T = any>(
  key: LocalforageKey,
  defaultValue?: T | (() => T),
) {
  const defaultState = await getState();
  const state = ref(defaultState) as Ref<T | undefined>;

  async function getState() {
    const raw = await localforage.getItem<T>(key);
    if (raw) {
      return raw;
    }
    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)();
    }
    return defaultValue;
  }

  function setState() {
    localforage.setItem(key, state.value);
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
