import { UseRequestOptions } from './types';

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
  formatResult: (res: any) => res,
  requestMethod: fetchProxy,
  // refreshDeps: undefined,
  manual: false,
  onSuccess: () => {},
  onError: () => {},
  onFinally: () => {},

  defaultLoading: false,
  loadingDelay: 0,

  pollingInterval: 0,
  pollingWhenHidden: true,
  pollingSinceLastFinished: true,

  defaultParams: [] as any[],
  debounceInterval: 0,
  loadingWhenDebounceStart: true,
  throttleInterval: 0,
  initialData: undefined,
  // ready: true,
  throwOnError: false,
  refreshDeps: [],
  refreshOnWindowFocus: false,
} as UseRequestOptions;
