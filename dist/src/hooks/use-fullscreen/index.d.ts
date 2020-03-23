import { Ref } from 'vue';
export interface Options<T> {
    dom?: T | (() => T) | null;
    onExitFull?: () => void;
    onFull?: () => void;
}
export interface Result<T> {
    isFullscreen: boolean;
    setFull: () => void;
    exitFull: () => void;
    toggleFull: () => void;
    ref?: Ref;
}
declare const _default: <T extends HTMLElement = HTMLElement>(options?: Options<T> | undefined) => Result<T>;
export default _default;
