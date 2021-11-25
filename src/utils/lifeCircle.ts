import { getCurrentInstance, onMounted } from 'vue-demi';

export function safeOnMounted(hook: () => any) {
  const instance = getCurrentInstance();
  if (instance?.isMounted || (instance as any)._isMounted) {
    hook();
  } else {
    onMounted(hook);
  }
}
