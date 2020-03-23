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

const screenfull = require('screenfull');
var useFullScreen = (options) => {
    const { dom, onExitFull, onFull } = options || {};
    const element = ref(null);
    const passedInElement = typeof dom === 'function' ? dom() : dom;
    const { state, toggle, setTrue, setFalse } = useBoolean(false);
    function handleStateChange() {
        const targetElemnt = passedInElement || element.value;
        if (!targetElemnt) {
            return;
        }
        if (!screenfull.isEnabled) {
            return;
        }
        const { isFullscreen } = screenfull;
        if (state.value && !isFullscreen) {
            screenfull.request(targetElemnt);
            onFull && onFull();
        }
        if (!state.value && isFullscreen) {
            screenfull.exit();
            onExitFull && onExitFull();
        }
    }
    watch(state, handleStateChange);
    const result = {
        isFullscreen: !!state,
        setFull: setTrue,
        exitFull: setFalse,
        toggleFull: toggle,
    };
    return result;
};

var index = {
    useToggle,
    useFullScreen,
};

export default index;
export { useFullScreen, useToggle };
