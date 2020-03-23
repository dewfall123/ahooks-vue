const screenfull = require('screenfull');
import useBoolean from '../use-boolean';
import { ref, Ref, watch } from 'vue';

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

export default <T extends HTMLElement = HTMLElement>(options?: Options<T>): Result<T> => {
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


  const result: Result<T> = {
    isFullscreen: !!state,
    setFull: setTrue,
    exitFull: setFalse,
    toggleFull: toggle,
  };

  return result;
};
