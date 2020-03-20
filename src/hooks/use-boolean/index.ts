import useToggle from '../use-toggle';

const useBoolean = (defaultValue: boolean = false) => {
  const { state, toggle } = useToggle(defaultValue);

  const setTrue = () => toggle(true);

  const setFalse = () => toggle(false);

  return {
    state,
    toggle,
    setTrue,
    setFalse,
  };
};

export default useBoolean;
