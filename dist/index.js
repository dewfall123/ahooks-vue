import { ref, watch } from 'vue';

function useToggle(defaultValue = false, reverseValue) {
    const state = ref(defaultValue);
    const setState = (value) => {
        state.value = value;
    };
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue);
    // 切换返回值
    const toggle = (value) => {
        if (!value) {
            value = state.value === defaultValue ? reverseValueOrigin : defaultValue;
        }
        setState(value);
    };
    // 设置默认值
    const setLeft = () => {
        setState(defaultValue);
    };
    // 设置取反值
    const setRight = () => {
        setState(reverseValueOrigin);
    };
    return {
        state,
        toggle,
        setLeft,
        setRight,
    };
}

const useBoolean = (defaultValue = false) => {
    const { state, toggle } = useToggle(defaultValue);
    const setTrue = () => toggle(true);
    const setFalse = () => toggle(false);
    return {
        state,
        toggle,
        setTrue,
        setFalse,
    };
};
var index = {
    useToggle,
};

const a = 'aaaa'
export default index;
export {  useToggle, a };
