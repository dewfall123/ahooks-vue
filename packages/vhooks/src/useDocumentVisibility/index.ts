import { computed, onUnmounted, ref } from 'vue-demi';

export function useDocumentVisibility() {
  const visibilityState = ref(document.visibilityState);

  const isVisible = computed(() => visibilityState.value === 'visible');

  function handleVisibilitychange() {
    visibilityState.value = document.visibilityState;
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

export default useDocumentVisibility;
