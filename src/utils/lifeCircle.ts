import { getCurrentInstance, onMounted } from 'vue-demi';

export function safeOnMounted(hook: () => any) {
  let instance = getCurrentInstance();
  // @ts-ignore
  instance = instance?.proxy || instance;
  if (instance?.isMounted || (instance as any)._isMounted) {
    hook();
  } else {
    onMounted(hook);
  }
}
