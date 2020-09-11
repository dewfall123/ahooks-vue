import { ref } from '@vue/composition-api';

export function useDocumentVisibility() {
  const visible = ref(document.visibilityState);

  document.addEventListener('visibilitychange', () => {
    visible.value = document.visibilityState;
  });

  return visible;
}

export default useDocumentVisibility;
