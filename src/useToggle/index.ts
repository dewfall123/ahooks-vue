import { ref } from 'vue';

type IState = string | number | boolean | undefined;

// function useToggle<T = boolean | undefined>(): {
//   state: boolean;
//   toggle: (value?: T) => void;
//   setLeft: () => void;
//   setRight: () => void;
// };

function useToggle(defaultValue: IState = false) {
  const state = ref(defaultValue);

  const toggle = () => {
    state.value = state.value ? false : true;
  }

  return {
    state, toggle,
  }
}

export default useToggle;
