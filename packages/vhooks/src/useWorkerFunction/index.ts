import { ref, Ref } from 'vue-demi';
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

type WorkerWithURL = Worker & { _url?: string };

export function useWorkerFunction<T extends (...fnArgs: any[]) => any>(
  fn: T,
  options: Options = {},
): {
  worker: Ref<WorkerWithURL>;
  status: Ref<WORKER_STATUS>;
  callWokerFn: (...workerArgs: Parameters<T>) => Promise<ReturnType<T>>;
  killWorker: () => void;
} {
  const worker = ref<null | WorkerWithURL>(null);
  let timeoutId: null | number = null;
  const status = ref<WORKER_STATUS>(WORKER_STATUS.PENDING);

  function killWorker() {
    if (worker.value?._url) {
      worker.value.terminate();
      URL.revokeObjectURL(worker.value._url);
      worker.value = null;
      timeoutId && clearTimeout(timeoutId);
    }
  }

  function setWorkerStatus(s: WORKER_STATUS) {
    status.value = s;
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

  worker.value = new Worker(blobUrl);
  worker.value._url = blobUrl;

  function callWokerFn(...workerArgs: Parameters<T>) {
    const { transferable = DEFAULT_OPTIONS.transferable } = options;
    return new Promise<ReturnType<T>>((resolve, reject) => {
      if (!worker.value) {
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

      worker.value!.postMessage([[...workerArgs]], transferList);

      worker.value!.onmessage = (e: MessageEvent) => {
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

      worker.value!.onerror = (e: ErrorEvent) => {
        reject(e);
        onWorkerEnd(WORKER_STATUS.ERROR);
      };

      if (timeout) {
        timeoutId = setTimeout(() => {
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
    worker: worker as Ref<WorkerWithURL>,
    status,
  };
}

export default useWorkerFunction;
