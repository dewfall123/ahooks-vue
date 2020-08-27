import { reactive } from "vue";

type WorkerController = {
  status: WORKER_STATUS;
  kill: Function;
};

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

export function useWorker<T extends (...fnArgs: any[]) => any>(
  fn: T,
  options: Options,
) {
  const state = reactive({
    
  })
}

export default useWorker;
