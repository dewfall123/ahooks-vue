import screenfull from 'screenfull';
import useBoolean from '../useBoolean';
import { Ref, watch, onMounted } from 'vue';
import { BasicTarget, getTargetElement } from '../../utils/dom';

export interface Options<T> {
  onExitFull?: () => void;
  onFull?: () => void;
}

export interface Result<T> {
  isFullscreen: Ref<boolean>;
  setFull: () => void;
  exitFull: () => void;
  toggleFull: () => void;
  ref?: Ref;
}

export function useFullscreen<T extends HTMLElement = HTMLElement>(
  target: BasicTarget,
  options?: Options<T>,
): Result<T> {
  const { onExitFull, onFull } = options || {};

  const { state, toggle, setTrue, setFalse } = useBoolean(false);

  onMounted(() => {
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

  const result: Result<T> = {
    isFullscreen: state,
    setFull: setTrue,
    exitFull: setFalse,
    toggleFull: toggle,
  };

  return result;
}

export default useFullscreen;
