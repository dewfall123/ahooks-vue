import useToggle from '../use-toggle';

const useBoolean = (defaultValue = false) => {
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

export default useBoolean;
