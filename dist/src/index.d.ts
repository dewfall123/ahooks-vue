import useToggle from './hooks/use-toggle';
import useFullScreen from './hooks/use-fullscreen';
declare const _default: {
    useToggle: typeof useToggle;
    useFullScreen: <T extends HTMLElement = HTMLElement>(options?: import("./hooks/use-fullscreen").Options<T> | undefined) => import("./hooks/use-fullscreen").Result<T>;
};
export default _default;
export { useToggle, useFullScreen, };
