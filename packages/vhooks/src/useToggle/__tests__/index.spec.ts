import { useToggle } from '../index';

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('test on init', async () => {
    const { state } = useToggle();
    expect(state.value).toBeFalsy();
  });

  it('test on methods', async () => {
    const { state, toggle, setLeft, setRight } = useToggle('Hello');
    expect(state.value).toEqual('Hello');

    toggle();
    expect(state.value).toBeFalsy();

    toggle();
    expect(state.value).toEqual('Hello');

    setLeft();
    expect(state.value).toEqual('Hello');

    setRight();
    expect(state.value).toBeFalsy();
  });

  it('test on optional', () => {
    const { state, toggle, setLeft, setRight } = useToggle('Hello', 'Word');
    expect(state.value).toEqual('Hello');

    toggle();
    expect(state.value).toEqual('Word');

    setLeft();
    expect(state.value).toEqual('Hello');

    setRight();
    expect(state.value).toEqual('Word');
  });
});
