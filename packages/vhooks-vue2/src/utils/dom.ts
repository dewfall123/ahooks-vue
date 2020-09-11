import { Ref, unref, isRef } from '@vue/composition-api';

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | Ref<T | null | undefined>;

export type TargetElement = HTMLElement | Document | Window;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetElement | undefined | null;

  if (isRef(target)) {
    targetElement = unref(target);
  }

  if (typeof target === 'function') {
    targetElement = target();
  }
  // else if ('current' in target) {
  //   targetElement = target.current;
  // } else {
  //   targetElement = target;
  // }

  if (!targetElement) {
    console.error('target is not available!');
  }

  return targetElement;
}
