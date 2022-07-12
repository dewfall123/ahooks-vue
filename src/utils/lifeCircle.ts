import { getCurrentInstance, onMounted } from 'vue-demi';

export function safeOnMounted(hook: () => any) {
  const instance = getCurrentInstance();

  // fix 兼容vue2.7
  if (
    // @ts-ignore
    instance?.proxy?._isMounted ||
    instance?.isMounted ||
    // @ts-ignore
    instance._isMounted
  ) {
    hook();
  } else {
    onMounted(hook);
  }
}
