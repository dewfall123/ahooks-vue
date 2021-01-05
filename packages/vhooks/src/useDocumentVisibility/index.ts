import { computed, onUnmounted, ref } from 'vue-demi';

export interface UseDocumentVisibilityOptions {
  onHidden?: () => void;
  onVisible?: () => void;
  onChange?: (visibilityState: VisibilityState) => void;
}

export function useDocumentVisibility(options?: UseDocumentVisibilityOptions) {
  const { onChange, onHidden, onVisible } = options ?? {};
  const visibilityState = ref(document.visibilityState);

  const isVisible = computed(() => visibilityState.value === 'visible');

  function handleVisibilitychange() {
    visibilityState.value = document.visibilityState;
    onChange && onChange(document.visibilityState);
    if (document.visibilityState === 'visible') {
      onVisible && onVisible();
    } else {
      onHidden && onHidden();
    }
  }

  document.addEventListener('visibilitychange', handleVisibilitychange);

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilitychange);
  });

  return {
    visibilityState,
    isVisible,
  };
}
