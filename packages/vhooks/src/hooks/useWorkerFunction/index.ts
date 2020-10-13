import { reactive, toRefs } from 'vue-demi';
import createWorkerBlobUrl from './lib/createWorkerBlobUrl';
import { WORKER_STATUS } from './lib/status';

export enum TRANSFERABLE_TYPE {
  AUTO = 'auto',
  NONE = 'none',
}

type Options = {
  timeout?: number;
  remoteDependencies?: string[];
  autoTerminate?: boolean;
  transferable?: TRANSFERABLE_TYPE;
};

const DEFAULT_OPTIONS: Options = {
  timeout: undefined,
  remoteDependencies: [],
  autoTerminate: true,
  transferable: TRANSFERABLE_TYPE.AUTO,
};

export function useWorkerFunction<T extends (...fnArgs: any[]) => any>(
  fn: T,
  options: Options = {},
) {
  const state = reactive({
    worker: null as null | (Worker & { _url?: string }),
    status: WORKER_STATUS.PENDING,
    timeoutId: null as null | NodeJS.Timeout,
  });

  function killWorker() {
    if (state.worker?._url) {
      state.worker.terminate();
      URL.revokeObjectURL(state.worker._url);
      state.worker = null;
      state.timeoutId && clearTimeout(state.timeoutId);
    }
  }

  function setWorkerStatus(status: WORKER_STATUS) {
    state.status = status;
  }

  function onWorkerEnd(status: WORKER_STATUS) {
    const terminate =
      options.autoTerminate != null
        ? options.autoTerminate
        : DEFAULT_OPTIONS.autoTerminate;

    if (terminate) {
      killWorker();
    }
    setWorkerStatus(status);
  }

  const {
    remoteDependencies = DEFAULT_OPTIONS.remoteDependencies,
    timeout = DEFAULT_OPTIONS.timeout,
    transferable = DEFAULT_OPTIONS.transferable,
  } = options;

  const blobUrl = createWorkerBlobUrl(fn, remoteDependencies!, transferable!);

  state.worker = new Worker(blobUrl);
  state.worker._url = blobUrl;

  state.worker = state.worker;

  function callWokerFn(...workerArgs: Parameters<T>) {
    const { transferable = DEFAULT_OPTIONS.transferable } = options;
    return new Promise<ReturnType<T>>((resolve, reject) => {
      if (!state.worker) {
        reject('worker is not available!');
      }

      const transferList: any[] =
        transferable === TRANSFERABLE_TYPE.AUTO
          ? workerArgs.filter(
              (val: any) =>
                ('ArrayBuffer' in window && val instanceof ArrayBuffer) ||
                ('MessagePort' in window && val instanceof MessagePort) ||
                ('ImageBitmap' in window && val instanceof ImageBitmap) ||
                ('OffscreenCanvas' in window && val instanceof OffscreenCanvas),
            )
          : [];

      setWorkerStatus(WORKER_STATUS.RUNNING);

      state.worker!.postMessage([[...workerArgs]], transferList);

      state.worker!.onmessage = (e: MessageEvent) => {
        const [status, result] = e.data as [WORKER_STATUS, ReturnType<T>];

        switch (status) {
          case WORKER_STATUS.SUCCESS:
            onWorkerEnd(WORKER_STATUS.SUCCESS);
            resolve(result);
            break;
          default:
            onWorkerEnd(WORKER_STATUS.ERROR);
            reject(result);
            break;
        }
      };

      state.worker!.onerror = (e: ErrorEvent) => {
        reject(e);
        onWorkerEnd(WORKER_STATUS.ERROR);
      };

      if (timeout) {
        state.timeoutId = setTimeout(() => {
          killWorker();
          reject('timeout!');
          setWorkerStatus(WORKER_STATUS.TIMEOUT_EXPIRED);
        }, timeout);
      }
    });
  }

  return {
    callWokerFn,
    killWorker,
    ...toRefs(state),
  };
}

export default useWorkerFunction;
