import { useToggle } from '../useToggle';

export const useBoolean = (defaultValue = false) => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = () => toggle(true);

  const setFalse = () => toggle(false);

  const toggleBoolean = () => toggle();

  return {
    state,
    toggle: toggleBoolean,
    setTrue,
    setFalse,
  };
};
