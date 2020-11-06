import { Ref, UnwrapRef } from 'vue-demi';

export type noop = (...args: any[]) => void;

export type Service<R, P extends any[]> = (...args: P) => Promise<R>;
export type Mutate<R> = (x: R | undefined | ((data: R) => R)) => void;

export type RequestService = string | { [key: string]: any };
export type CombineService<R, P extends any[]> =
  | RequestService
  | ((...args: P) => RequestService)
  | Service<R, P>;

export interface FetchConfig<R, P extends any[]> {
  formatResult?: (res: any) => R;

  onSuccess?: (data: R, params: P) => void;
  onError?: (e: Error, params: P) => void;

  loadingDelay?: number; // loading delay

  // 轮询
  pollingInterval?: number; // 轮询的间隔毫秒
  pollingWhenHidden?: boolean; // 屏幕隐藏时，停止轮询

  refreshOnWindowFocus?: boolean;
  focusTimespan: number;

  debounceInterval?: number;
  throttleInterval?: number;

  throwOnError?: boolean;
}

export interface BaseResult<R, P extends any[]> {
  loading: Ref<boolean>;
  data: Ref<UnwrapRef<R | undefined>>;
  error: Ref<Error | undefined>;
  params: Ref<P>;
  lastSuccessedParams: Ref<P>;
  cancel: noop;
  refresh: () => Promise<R>;
  mutate: Mutate<R>;
  // TODO 如果 options 存在 debounceInterval，或 throttleInterval，则 run 和 refresh 不会返回 Promise。类型需要修复。
  run: (...args: P) => Promise<R>;
  unmount: () => void;
}

export type BaseOptions<R = any, P extends any[] = any[]> = {
  formatResult: (res: any) => R;
  // refreshDeps: DependencyList; // 如果 deps 变化后，重新请求
  manual: boolean; // 是否需要手动触发
  onSuccess: (data: R, params: P) => void; // 成功回调
  onError: (e: Error, params: P) => void; // 失败回调

  defaultLoading: boolean; // 默认 loading 状态

  loadingDelay: number; // loading delay

  defaultParams: P;
  // 轮询
  pollingInterval: number; // 轮询的间隔毫秒
  pollingWhenHidden: boolean; // 屏幕隐藏时，停止轮询

  // fetchKey: (...args: P) => string;

  // paginated: false;
  // loadMore: false;

  refreshOnWindowFocus: boolean;
  focusTimespan: number;

  // cacheKey: CachedKeyType;
  // cacheTime: number;
  // staleTime: number;

  debounceInterval: number;
  throttleInterval: number;

  initialData: R;

  requestMethod: (service: any) => Promise<any>;

  ready: boolean;
  throwOnError: boolean;
};
