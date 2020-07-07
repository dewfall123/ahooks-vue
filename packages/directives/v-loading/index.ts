import { DirectiveHook, DirectiveBinding, VNode } from 'vue';
import { maskStyles } from './constants';

interface HTMLElementWithMask extends HTMLElement {
  mask?: HTMLDivElement;
}

function insertMask(el: HTMLElementWithMask, binding: DirectiveBinding) {
  const mask = document.createElement('div');
  Object.assign(mask.style, {
    ...maskStyles,
  });

  if (el.style.position !== 'absolute' && el.style.position !== 'fixed') {
    el.style.position = 'relative';
  }

  el.append(mask);
  el.mask = mask;
}

function toogleMask(el: HTMLElementWithMask, binding: DirectiveBinding) {
  if (!el.mask) {
    return;
  }
  if (Boolean(binding.value)) {
    el.mask.style.opacity = '0';
  } else {
    el.mask.style.opacity = '1';
  }
}

// add
const beforeMount: DirectiveHook<HTMLElement> = (el, binding, vnode) => {
  insertMask(el, binding);
};

const updated: DirectiveHook<HTMLElement> = (el, binding, vnode) => {
  toogleMask(el, binding);
};

const unmounted: DirectiveHook<HTMLElement> = (el, binding, vnode) => {};

export default {
  beforeMount,
  updated,
  unmounted,
};
