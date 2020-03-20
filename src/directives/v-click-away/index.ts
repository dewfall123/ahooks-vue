import { DirectiveHook } from 'vue';

const eventName = 'click';
let handle: EventHandlerNonNull;

const mounted: DirectiveHook = (el: Element, { value }) => {
  handle = (e: Event) => {
    if (!el || el.contains(e.target as Node)) {
      return;
    }
    if (typeof value === 'function') {
      value(e);
    }
  };
  document.addEventListener(eventName, handle);
};

const unmounted: DirectiveHook = (el, binding) => {
  document.removeEventListener(eventName, handle);
};

const vClickAway = {
  mounted,
  unmounted,
};

export default vClickAway;
