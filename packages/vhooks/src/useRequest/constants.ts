import { BaseOptions } from './types';

function fetchProxy(params: string | Record<string, string>) {
  let url: string;
  let rest;
  if (typeof params === 'string') {
    url = params;
  } else {
    url = params.url;
    rest = params;
  }
  return fetch(url, rest).then((res: Response) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}

export const DefaultOptions = {
  formatResult: (res) => res,
  requestMethod: fetchProxy,
  // refreshDeps: [],
  manual: false,
  onSuccess: () => {},
  onError: () => {},

  defaultLoading: false,
  loadingDelay: 0,

  pollingInterval: 0,
  pollingWhenHidden: true,

  defaultParams: [] as any[],
  refreshOnWindowFocus: false,
  focusTimespan: 5000,
  // fetchKey,
  // cacheKey,
  cacheTime: 5 * 60 * 1000,
  staleTime: 0,
  debounceInterval: 0,
  throttleInterval: 0,
  initialData: undefined,
  ready: true,
  throwOnError: false,
} as BaseOptions;
