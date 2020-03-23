import { Ref } from 'vue';
declare type IState = string | number | boolean | undefined;
declare function useToggle<T = boolean | undefined>(): {
    state: Ref<boolean>;
    toggle: (value?: T) => void;
    setLeft: () => void;
    setRight: () => void;
};
declare function useToggle<T = IState>(defaultValue: T): {
    state: Ref<T>;
    toggle: (value?: T) => void;
    setLeft: () => void;
    setRight: () => void;
};
declare function useToggle<T = IState, U = IState>(defaultValue: T, reverseValue: U): {
    state: Ref<T | U>;
    toggle: (value?: T | U) => void;
    setLeft: () => void;
    setRight: () => void;
};
export default useToggle;
