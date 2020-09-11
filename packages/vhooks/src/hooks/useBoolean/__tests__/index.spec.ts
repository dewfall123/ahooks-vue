import useBoolean from '../index';

describe('useBoolean', () => {
  it('should be defined', () => {
    expect(useBoolean).toBeDefined();
  });

  it('should default to be false', async () => {
    const { state } = useBoolean();
    expect(state.value).toBeFalsy();
  });

  it('should work', async () => {
    const { state, toggle, setFalse, setTrue } = useBoolean(true);
    expect(state.value).toEqual(true);

    toggle();
    expect(state.value).toEqual(false);

    setTrue();
    expect(state.value).toEqual(true);

    setFalse()
    expect(state.value).toEqual(false);
  })
});
