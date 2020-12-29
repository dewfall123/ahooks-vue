import { BasicTarget, getTargetElement } from '../utils/dom';
import { reactive, onUnmounted } from 'vue-demi';
import ResizeObserver from 'resize-observer-polyfill';
import { safeOnMounted } from '../utils';

export function useSize(target: BasicTarget) {
  const size = reactive({
    width: undefined,
    height: undefined,
  });

  safeOnMounted(() => {
    const targetElement = getTargetElement(target);
    if (!targetElement) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        Object.assign(size, {
          width: entry.target.clientWidth,
          height: entry.target.clientHeight,
        });
      });
    });

    resizeObserver.observe(targetElement as HTMLElement);

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  });

  return size;
}
