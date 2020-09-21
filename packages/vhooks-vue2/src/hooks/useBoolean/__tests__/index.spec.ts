import useBoolean from '../index';
import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

describe('useBoolean', () => {
  beforeAll(() => {
		Vue.use(VueCompositionAPI);
	});
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

    setFalse();
    expect(state.value).toEqual(false);
  });
});
