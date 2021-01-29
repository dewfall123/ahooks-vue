import { BasicTarget, getTargetElement } from '../utils/dom';
import { reactive, onUnmounted } from 'vue-demi';
import ResizeObserver from 'resize-observer-polyfill';

import { safeOnMounted } from '../utils';

export interface TargetSize {
  width: undefined | number;
  height: undefined | number;
}

export interface UseSizeOptions {
  onChange?: (size: TargetSize) => void;
}

export function useSize(target: BasicTarget, options?: UseSizeOptions) {
  const size = reactive<TargetSize>({
    width: undefined,
    height: undefined,
  });

  const onSizeChange = options?.onChange;

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
        onSizeChange && onSizeChange(size);
      });
    });

    resizeObserver.observe(targetElement as HTMLElement);

    onUnmounted(() => {
      resizeObserver.disconnect();
    });
  });

  return size;
}
