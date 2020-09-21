import VueRouter, { Route } from 'vue-router';
import { ref, watch } from '@vue/composition-api';

interface Options<T> {
  defaultValue?: T;
  serialize?: (value: T) => string;
  deserialize?: (string: string) => T;
}

function defaultSerialize<T>(value: T): string {
  return encodeURIComponent(JSON.stringify(value));
}

function defaultDeserialize<T>(urlString: string): T {
  let value;
  try {
    value = JSON.parse(decodeURIComponent(urlString));
  } catch {}
  return value;
}

export function useUrlState<T>(
  router: VueRouter,
  route: Route,
  key: string,
  options?: Options<T>,
) {
  const {
    defaultValue,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
  } = options ?? {};

  function parseUrl() {
    const urlValue = route.params[key] ?? defaultValue;
    return deserialize(urlValue as string);
  }

  const state = ref(parseUrl());

  function setUrl() {
    const params = { ...route.params, key: serialize(state.value as T) };
    router.push({
      params,
    });
  }

  watch(
    state,
    () => {
      setUrl();
    },
    { immediate: false },
  );

  return {
    state,
  };
}

export default useUrlState;
