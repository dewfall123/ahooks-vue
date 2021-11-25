import qs from 'qs';
import { Ref, ref, watch } from 'vue-demi';
import { useLocalStorageState } from '../useLocalStorageState';

export interface UseUrlStateOptions {
  localStorageKey?: string;
}

interface UrlState {
  [key: string]: any;
}

function encodeParams(value: UrlState) {
  return qs.stringify(value);
}

function decodeParams(valueStr: string) {
  // return JSON.parse(decodeURIComponent(atob(valueStr)));
  return qs.parse(valueStr, {
    // fix: 数组长度限制问题
    arrayLimit: 10000,
    decoder(str, decoder, charset) {
      const strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }

      if (/^[+-]?\d+(\.\d+)?$/.test(str)) {
        return parseFloat(str);
      }

      const keywords: Record<string, any> = {
        true: true,
        false: false,
        null: null,
        undefined,
      };
      if (str in keywords) {
        return keywords[str];
      }

      // utf-8
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    },
  });
}

export function useUrlState<S extends UrlState = UrlState>(
  routerPushFn: (path: string) => void,
  initialState?: S | (() => S),
  options?: UseUrlStateOptions,
): Ref<S> {
  const { localStorageKey } = options ?? {};

  const [path, paramsStr] = location.hash.slice(1).split('?');

  const defaultState =
    (typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState) ?? ({} as S);
  let state = ref(defaultState) as Ref<S>;

  if (localStorageKey) {
    state = useLocalStorageState(localStorageKey, defaultState) as Ref<S>;
  }

  // 初始状态 url > localstorage
  if (paramsStr) {
    try {
      const paramsValue = decodeParams(paramsStr);
      console.log('解析url结果:');
      console.log(paramsValue);
      state.value = {
        ...defaultState,
        ...state.value,
        ...paramsValue,
      };
    } catch {
      state.value = defaultState;
    }
  }

  // 去掉多余的key
  if (initialState && Object.keys(initialState).length) {
    let newState = { ...initialState } as any;
    for (const key in newState) {
      if (key in state.value) {
        newState[key] = state.value[key];
      }
    }
    state.value = newState;
  }

  // 把params写到url
  watch(
    state,
    () => {
      const newParamsStr = encodeParams(state.value);

      routerPushFn(`${path}?${newParamsStr}`);
      console.log('写url');
      console.log(`${path}?${newParamsStr}`);
    },
    {
      deep: true,
      immediate: true,
    },
  );

  return state;
}
