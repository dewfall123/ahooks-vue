import { Ref, WatchSource } from 'vue-demi';

export type noop = (...args: any[]) => void;

export type Service<R, P extends any[]> = (...args: P) => Promise<R>;

export type RequestService = string | { [key: string]: any };
export type CombineService<R, P extends any[]> =
  | RequestService
  | ((...args: P) => RequestService)
  | Service<R, P>;

export interface UseRequestResult<R = any, P extends any[] = any[]> {
  loading: Ref<boolean>;
  data: Ref<R>;
  error: Ref<Error | undefined>;
  params: Ref<P>;
  lastSuccessParams: Ref<P | undefined>;
  cancel: () => void;
  refresh: () => Promise<any>;
  run: (...args: P) => Promise<R | undefined>;
}

export interface BaseUseRequestOptions<R = any, P extends any[] = any[]> {
  // formatResult: (res: any) => R;
  manual: boolean; // 是否需要手动触发
  onSuccess: (data: R, params: P) => void; // 成功回调
  onError: (e: Error, params: P) => void; // 失败回调
  onFinally: () => void; // finally回调
  defaultLoading: boolean; // 默认 loading 状态
  loadingDelay: number; // loading delay
  defaultParams: P;
  // 轮询
  pollingInterval: number; // 轮询的间隔毫秒
  pollingWhenHidden: boolean; // 屏幕隐藏时，停止轮询
  pollingSinceLastFinished: boolean; // 等上次请求结束，再开始轮询

  debounceInterval: number;
  loadingWhenDebounceStart: boolean; // 在debounce等待阶段，是否把loading设置为true
  throttleInterval: number;

  // initialData: R;
  requestMethod: (service: any) => Promise<any>;
  ready: Ref<boolean>;
  throwOnError: boolean;
  refreshDeps: Array<WatchSource>; // 如果 deps 变化后，重新请求
  refreshOnWindowFocus: boolean;
}
export interface UseRequestOptionsWithFormatResult<
  R = any,
  P extends any[] = any[],
  SR = any
> extends Partial<BaseUseRequestOptions<R, P>> {
  formatResult: (res: SR) => R;
}
export interface UseRequestOptionsWidthInitalData<
  R = any,
  P extends any[] = any[]
> extends Partial<BaseUseRequestOptions<R, P>> {
  initialData: R;
}

export type UseRequestOptions<
  R = any,
  P extends any[] = any[]
> = BaseUseRequestOptions<R, P> &
  UseRequestOptionsWithFormatResult<R, P, any> &
  UseRequestOptionsWidthInitalData<R, P>;
