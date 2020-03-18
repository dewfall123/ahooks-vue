import { ref } from 'vue';

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

var index = {
    useToggle,
};

export default index;
export { useToggle };
