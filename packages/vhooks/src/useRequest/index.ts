import { inject, onUnmounted, Ref, ref } from 'vue-demi';
import { DefaultOptions } from './constants';
import { UseRequestOptions, UseRequestResult, CombineService } from './types';
import { debounce, throttle } from 'lodash-es';
import { useDocumentVisibility } from '../useDocumentVisibility';

export const RequestConfig = Symbol('useRequestConfig');

// export function useRequest<
//   R = any,
//   P extends any[] = any[],
//   U = any,
//   UU extends U = any
// >(
//   service: CombineService<R, P>,
//   options: Partial<UseRequestOptions<R, P>>,
// ): BaseResult<U, P>;

export function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options: Partial<UseRequestOptions<R, P>> = {},
): UseRequestResult<R, P> {
  const contextConfig = inject<Partial<UseRequestOptions<R, P>>>(RequestConfig);
  const finalOptions = { ...DefaultOptions, ...contextConfig, ...options };

  const {
    requestMethod,
    defaultLoading,
    manual,
    throwOnError,
    onSuccess,
    onError,
    formatResult,
    initialData,
    defaultParams,
    loadingDelay,
    debounceInterval,
    loadingWhenDebounceStart,
    throttleInterval,
    loadingWhenThrottleStart,
    pollingInterval,
    pollingWhenHidden,
    pollingSinceLastFinished,
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
  const data = ref<R>(initialData);
  const error = ref<Error>();
  const params = ref<P>(defaultParams as P) as Ref<P>;
  const lastSuccessParams = ref<P>();

  let unmountedFlag = false;
  onUnmounted(() => {
    unmountedFlag = true;
  });
  const documentVisible = useDocumentVisibility();

  let count = 0;

  let loadingDelayTimer: any;
  let pollingSinceFinishedTimer: any;

  function _run(...args: P) {
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
    params.value = args;

    // 抛弃该次请求结果
    const shoundAbandon = () => unmountedFlag || curCount !== count;

    promiseService(...args)
      .then((res) => {
        if (shoundAbandon()) {
          return;
        }
        const formattedResult = formatResult(res);
        onSuccess(res, args);
        data.value = formattedResult;

        lastSuccessParams.value = args;
        return formattedResult;
      })
      .catch((err) => {
        if (shoundAbandon()) {
          return;
        }
        console.error(err);
        error.value = err;
        onError(err, args);
        if (throwOnError) {
          throw err;
        }
        return Promise.reject(
          'useRequest has caught the exception, if you need to handle the exception yourself, you can set options.throwOnError to true.',
        );
      })
      .finally(() => {
        if (shoundAbandon()) {
          return;
        }
        if (loadingDelayTimer) {
          clearTimeout(loadingDelayTimer);
        }
        // 在请求结束时轮询
        if (pollingInterval && pollingSinceLastFinished) {
          if (pollingWhenHidden && !documentVisible.value) {
            return;
          }
          pollingSinceFinishedTimer = setTimeout(() => {
            _run(...args);
          }, pollingInterval);
        }
        loading.value = false;
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
      debounceRun(...args);
    };
  }
  if (throttleInterval) {
    const throttleRun = throttle(_run, throttleInterval);
    run = (...args: P) => {
      if (loadingWhenThrottleStart) {
        loading.value = true;
      }
      throttleRun(...args);
    };
  }

  let pollingTimer: any;
  if (pollingInterval && !pollingSinceLastFinished) {
    run = (...args: P) => {
      if (pollingTimer) {
        clearInterval(pollingTimer);
      }
      _run(...args);
      pollingTimer = setInterval(() => {
        if (pollingWhenHidden && !documentVisible.value) {
          return;
        }
        _run(...args);
      }, pollingInterval);
    };
  }

  function refresh() {
    run(...(params.value as any));
  }

  // 自动执行
  if (!manual) {
    run(...(defaultParams as P));
  }

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
