import {
  getCurrentInstance,
  inject,
  onUnmounted,
  Ref,
  ref,
  watch,
} from 'vue-demi';
import { DefaultOptions } from './constants';
import {
  BaseUseRequestOptions,
  UseRequestResult,
  CombineService,
  UseRequestOptionsWithFormatResult,
  UseRequestOptionsWithInitialData,
  UseRequestOptions,
} from './types';
import { cloneDeep, debounce, throttle } from 'lodash';
import { useDocumentVisibility } from '../useDocumentVisibility';

export const RequestConfig = Symbol('useRequestConfig');

export * from './types';

// 同时有formateResult initialData
export function useRequest<R = any, P extends any[] = any, SR = any>(
  service: CombineService<SR, P>,
  options: UseRequestOptionsWithFormatResult<R, P, SR> &
    UseRequestOptionsWithInitialData<R, P>,
): UseRequestResult<R, P>;

// 仅有formateResult 
export function useRequest<R = any, P extends any[] = any, SR = any>(
  service: CombineService<SR, P>,
  options: UseRequestOptionsWithFormatResult<R, P, SR>,
): UseRequestResult<R | undefined, P>;

// 仅有initialData
export function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options: UseRequestOptionsWithInitialData<R, P>,
): UseRequestResult<R, P>;

// 无formateResult initialData
export function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options: Partial<BaseUseRequestOptions<R, P>>,
): UseRequestResult<R | undefined, P>;

export function useRequest<R = any, P extends any[] = any, SR = any>(
  service: CombineService<R, P>,
  options: Partial<UseRequestOptions<R, P, SR>> = {},
) {
  let contextConfig = {} as Partial<UseRequestOptions<R, P>>;
  if (getCurrentInstance()) {
    contextConfig = inject<Partial<UseRequestOptions<R, P>>>(RequestConfig, {});
  }
  const finalOptions = { ...DefaultOptions, ...contextConfig, ...options };

  const {
    requestMethod,
    defaultLoading,
    manual,
    throwOnError,
    onSuccess,
    onError,
    onFinally,
    formatResult,
    initialData,
    defaultParams,
    loadingDelay,
    debounceInterval,
    loadingWhenDebounceStart,
    throttleInterval,
    pollingInterval,
    pollingWhenHidden,
    pollingSinceLastFinished,
    refreshOnWindowFocus,
    refreshDeps,
    ready,
  } = finalOptions;

  let promiseService: (...args: P) => Promise<any>;

  if (['string', 'object'].includes(typeof service)) {
    promiseService = () => requestMethod(service);
  } else {
    promiseService = (...args: P) =>
      new Promise((resolve, reject) => {
        const returnedService = (service as any)(...args);
        let fn = returnedService;
        if (!(returnedService as any).then) {
          if (!['string', 'object'].includes(typeof returnedService)) {
            throw new Error(
              'If sevice is a function, it must return a String, Object or Promise',
            );
          }
          fn = requestMethod(returnedService);
        }
        (fn as Promise<any>).then(resolve).catch(reject);
      });
  }

  const loading = ref<boolean>(defaultLoading);
  const data = ref(initialData) as Ref<R>;
  const error = ref<Error>();
  const params = ref<P>(defaultParams as P) as Ref<P>;
  const lastSuccessParams = ref<P>(defaultParams as P) as Ref<P>;
  let count = 0;

  let unmountedFlag = false;
  if (getCurrentInstance()) {
    onUnmounted(() => {
      unmountedFlag = true;
    });
  }

  let isVisible = ref(true);
  if (getCurrentInstance()) {
    isVisible = useDocumentVisibility({
      // 页面聚焦时请求一次
      onVisible() {
        if (refreshOnWindowFocus) {
          refresh();
        }
      },
    }).isVisible;
  }

  let loadingDelayTimer: any;
  let pollingSinceFinishedTimer: any;

  function _run(...args: P) {
    // 只要 ready=false 不执行
    if (!ready.value) {
      return Promise.resolve();
    }
    if (pollingSinceFinishedTimer) {
      clearTimeout(pollingSinceFinishedTimer);
    }
    if (loadingDelayTimer) {
      clearTimeout(loadingDelayTimer);
    }
    // 设置loading
    if (loadingDelay) {
      loadingDelayTimer = setTimeout(() => {
        loading.value = true;
      }, loadingDelay);
    } else {
      loading.value = true;
    }
    count++;
    const curCount = count;
    params.value = cloneDeep(args);

    // 抛弃该次请求结果
    const shouldAbandon = () => unmountedFlag || curCount !== count;

    return promiseService(...args)
      .then(res => {
        if (shouldAbandon()) {
          return;
        }
        const formattedResult = formatResult(res);
        data.value = formattedResult;

        // fix #21
        error.value = undefined;

        lastSuccessParams.value = cloneDeep(args);
        onSuccess(formattedResult, args);
        return formattedResult;
      })
      .catch(err => {
        if (shouldAbandon()) {
          return;
        }
        console.error(err);
        error.value = err;
        onError(err, args);
        if (throwOnError) {
          throw err;
        }
      })
      .finally(() => {
        if (shouldAbandon()) {
          return;
        }
        if (loadingDelayTimer) {
          clearTimeout(loadingDelayTimer);
        }
        // 在请求结束时轮询
        if (pollingInterval && pollingSinceLastFinished) {
          // 当时页面不可见，等页面可见再查询
          if (pollingWhenHidden && !isVisible.value) {
            pollingSinceFinishedTimer = setInterval(() => {
              // 需要恢复查询
              if (!(pollingWhenHidden && !isVisible.value)) {
                clearInterval(pollingSinceFinishedTimer);
                _run(...args);
              }
            }, pollingInterval);
          } else {
            pollingSinceFinishedTimer = setTimeout(() => {
              _run(...args);
            }, pollingInterval);
          }
        }
        loading.value = false;
        onFinally();
      });
  }

  const cancel = () => {
    if (pollingTimer) {
      clearInterval(pollingTimer);
    }
    if (pollingSinceFinishedTimer) {
      clearTimeout(pollingSinceFinishedTimer);
    }
    if (loadingDelayTimer) {
      clearTimeout(loadingDelayTimer);
    }
    count++;
    loading.value = false;
  };

  let run = _run;
  if (debounceInterval) {
    const debounceRun = debounce(_run, debounceInterval);
    run = (...args: P) => {
      // 在debounce等待阶段把loading设置为true，比loadingDelay优先级高
      if (loadingWhenDebounceStart) {
        loading.value = true;
      }
      return Promise.resolve(debounceRun(...args)!);
    };
  }
  if (throttleInterval) {
    const throttleRun = throttle(_run, throttleInterval);
    run = (...args: P) => {
      return Promise.resolve(throttleRun(...args)!);
    };
  }

  let pollingTimer: any;
  // 每隔x时间开始轮询，不管上次什么时候结束
  if (pollingInterval && !pollingSinceLastFinished) {
    run = (...args: P) => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
      }
      pollingTimer = setInterval(() => {
        if (pollingWhenHidden && !isVisible.value) {
          return;
        }
        _run(...args);
      }, pollingInterval);

      return _run(...args);
    };
  }

  function refresh() {
    return run(...params.value);
  }

  // 自动执行
  if (!manual) {
    // ready 变为true 自动发起请求，会带上参数 options.defaultParams
    watch(
      ready,
      () => {
        if (ready.value) {
          run(...(defaultParams as P));
        }
      },
      {
        immediate: true,
      },
    );
  }

  // refreshDeps
  watch(refreshDeps, refresh);

  return {
    loading,
    error,
    data,
    run,
    params,
    lastSuccessParams,
    cancel,
    refresh,
  };
}
