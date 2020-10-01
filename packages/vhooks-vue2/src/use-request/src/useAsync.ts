import { reactive, toRefs, watch,ToRefs, WatchOptions  } from "vue";
import { timeWait,Deps, TimeOut } from "./utils";


export interface AsyncStatus<T = any> {
    loading: boolean;
    error: Error | void;
    data: T | void;
}

const initStatus: AsyncStatus = {
    loading: false,
    error: void 0,
    data: void 0,
};

const useAsync = (
    service: () => Promise<any>,
    options: WatchOptions & {
        initialData?: any;
        onSuccess?(data: any): any;
        onError?(error: Error): any;
        delay?: number;
        deps?: Deps;
    } = {}
) => {
    const { onError, onSuccess, immediate, onTrack, onTrigger, delay, deps, initialData } = options;

    const status = reactive({ ...initStatus, data: initialData });

    let currId = 0,
        delayTimer: TimeOut;

    const handler = async (id: number) => {
            status.loading = true;

            const handleStatus: any = {};

            let isErr = false;

            try {
                handleStatus.data = await service();
            } catch (error) {
                handleStatus.error = error;
                isErr = true;
            }

            if (id === currId) {
                delay && (await timeWait(delay));

                handleStatus.loading = false;
                if (isErr) {
                    onError?.(handleStatus.error);
                } else {
                    onSuccess?.(handleStatus.data);
                }

                Object.assign(status, handleStatus);
            }
        },
        run = async () => {
            await handler(++currId);

            return status;
        },
        cancel = () => {
            status.loading = false;
            clearTimeout(delayTimer);
            ++currId;
        };

    immediate && run();

    deps && watch(deps, async () => await handler(++currId), { onTrack, onTrigger });

    return { ...toRefs(status), run, cancel } as ToRefs<AsyncStatus> & {
        run(): Promise<any>;
        cancel(): void;
    };
};

export default useAsync;
