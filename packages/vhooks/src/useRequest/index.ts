import { inject, onUnmounted, ref, watch } from 'vue-demi';
import { DefaultOptions } from './constants';
import { BaseOptions, BaseResult, CombineService } from './types';

export const RequestConfig = Symbol('useRequestConfig');

// export function useRequest<
//   R = any,
//   P extends any[] = any[],
//   U = any,
//   UU extends U = any
// >(
//   service: CombineService<R, P>,
//   options: Partial<BaseOptions<R, P>>,
// ): BaseResult<U, P>;

export function useRequest<
  R = any,
  P extends any[] = any[],
  U = any,
  UU extends U = any
>(service: CombineService<R, P>, options: Partial<BaseOptions<R, P>> = {}) {
  const contextConfig = inject<Partial<BaseOptions<R, P>>>(RequestConfig);
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
          fn = () => requestMethod(returnedService);
        }
        (fn as Promise<any>).then(resolve).catch(reject);
      });
  }

  const loading = ref<boolean>(defaultLoading);
  const data = ref<R>(initialData);
  const error = ref<Error>();
  const params = ref<P>();
  const lastSucceededParams = ref<P>();

  let unmountedFlag = false;
  onUnmounted(() => {
    unmountedFlag = true;
  });

  let count = 0;
  const cancel = () => {
    count++;
  };

  function refresh() {
    console.log(params.value);
    run(...((params.value ?? []) as any));
  }

  function run(...args: P) {
    loading.value = true;
    count++;
    const curCount = count;
    params.value = args;

    promiseService(...args)
      .then((res) => {
        if (unmountedFlag || curCount !== count) {
          return;
        }
        const formattedResult = formatResult(res);
        onSuccess(res, args);
        data.value = formattedResult;

        lastSucceededParams.value = args;
        return formattedResult;
      })
      .catch((err) => {
        if (unmountedFlag || curCount !== count) {
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
        if (unmountedFlag || curCount !== count) {
          return;
        }
        loading.value = false;
      });
  }

  if (!manual) {
    run(...(defaultParams as P));
  }

  return {
    loading,
    error,
    data,
    run,
    params,
    cancel,
    refresh,
  };
}
