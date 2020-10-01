import { WatchSource } from "vue";

export * from "./dom";
export type Deps =
    | WatchSource
    | Readonly<Array<WatchSource<unknown> | object>>
    | Record<string, any>;
export type Getter<T> = T | ((...args: any) => T);

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T> ? T : never;
export type Func = (...args: any) => any;
export type TimeOut = ReturnType<typeof setTimeout>;

export const isArray = Array.isArray;

export function timeWait(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
