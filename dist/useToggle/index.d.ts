declare type IState = string | number | boolean | undefined;
declare function useToggle(defaultValue?: IState): {
    state: import("vue").Ref<string> | import("vue").Ref<number> | import("vue").Ref<false> | import("vue").Ref<true>;
    toggle: () => void;
};
export default useToggle;
