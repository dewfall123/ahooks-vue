import screenfull from 'screenfull';
import { useBoolean } from '../useBoolean';
import { Ref, watch } from 'vue-demi';
import { BasicTarget, getTargetElement } from '../utils/dom';
import { safeOnMounted } from '../utils';

export interface Options {
  onExitFull?: () => void;
  onFull?: () => void;
}

export interface Result {
  isFullscreen: Ref<boolean>;
  setFull: () => void;
  exitFull: () => void;
  toggleFull: () => void;
  ref?: Ref;
}

export function useFullscreen(target: BasicTarget, options?: Options): Result {
  const { onExitFull, onFull } = options || {};

  const { state, toggle, setTrue, setFalse } = useBoolean(false);

  safeOnMounted(() => {
    function handleStateChange() {
      const targetElemnt = getTargetElement(target);

      if (!targetElemnt) {
        return;
      }

      if (!screenfull.isEnabled) {
        console.warn('fullscreen is not enabled!');
        return;
      }
      const { isFullscreen } = screenfull;
      if (state.value && !isFullscreen) {
        screenfull.request(targetElemnt as HTMLElement);
        onFull && onFull();
      }

      if (!state.value && isFullscreen) {
        screenfull.exit();
        onExitFull && onExitFull();
      }
    }

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        if (screenfull.isEnabled) {
          const { isFullscreen } = screenfull;
          state.value = isFullscreen;
        }
      });
    }

    watch(state, handleStateChange);
  });

  const result: Result = {
    isFullscreen: state,
    setFull: setTrue,
    exitFull: setFalse,
    toggleFull: toggle,
  };

  return result;
}
