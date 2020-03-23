declare const useBoolean: (defaultValue?: boolean) => {
    state: import("vue").Ref<boolean>;
    toggle: (value?: boolean | undefined) => void;
    setTrue: () => void;
    setFalse: () => void;
};
export default useBoolean;
