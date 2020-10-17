import { BasicTarget, getTargetElement } from '../utils/dom';
import { reactive, onMounted } from 'vue-demi';
import ResizeObserver from 'resize-observer-polyfill';

export function useSize(target: BasicTarget) {
  const size = reactive({
    width: undefined,
    height: undefined,
  });

  onMounted(() => {
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

    onMounted(() => {
      resizeObserver.disconnect();
    });
  });

  return size;
}
