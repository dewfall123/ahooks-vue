import { onMounted, onUnmounted, ref } from 'vue-demi';

export function useDocumentVisibility() {
  const visible = ref(document.visibilityState);

  function handleVisibilitychange() {
    visible.value = document.visibilityState;
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilitychange);
  });

  onUnmounted(() => {
    document.removeEventListener('visibilitychange', handleVisibilitychange);
  });

  return visible;
}

export default useDocumentVisibility;
