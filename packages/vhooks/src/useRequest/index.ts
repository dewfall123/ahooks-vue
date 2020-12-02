import { getCurrentInstance, inject, onUnmounted, Ref, ref } from 'vue-demi';
import { DefaultOptions } from './constants';
import { UseRequestOptions, UseRequestResult, CombineService } from './types';
import { debounce, throttle } from 'lodash-es';
import { useDocumentVisibility } from '../useDocumentVisibility';

export const RequestConfig = Symbol('useRequestConfig');

export function useRequest<R = any, P extends any[] = any>(
  service: CombineService<R, P>,
  options: Partial<UseRequestOptions<R, P>> = {},
): UseRequestResult<R, P> {
  let contextConfig = {} as Partial<UseRequestOptions<R, P>>;
  if (getCurrentInstance()) {
    contextConfig =
      inject<Partial<UseRequestOptions<R, P>>>(RequestConfig) ?? {};
  }
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
  const data = ref(initialData) as Ref<R>;
  const error = ref<Error>();
  const params = ref<P>(defaultParams as P) as Ref<P>;
  const lastSuccessParams = ref<P>(defaultParams as P) as Ref<P>;
  let count = 0;
  // pagination
  // const page

  let unmountedFlag = false;
  if (getCurrentInstance()) {
    onUnmounted(() => {
      unmountedFlag = true;
    });
  }

  let isVisible = ref(true);
  if (getCurrentInstance()) {
    isVisible = useDocumentVisibility().isVisible;
  }

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

    return promiseService(...args)
      .then((res) => {
        if (shoundAbandon()) {
          return;
        }
        const formattedResult = formatResult(res);
        data.value = formattedResult;

        lastSuccessParams.value = args;
        onSuccess(formattedResult, args);
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
          if (pollingWhenHidden && !isVisible.value) {
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
