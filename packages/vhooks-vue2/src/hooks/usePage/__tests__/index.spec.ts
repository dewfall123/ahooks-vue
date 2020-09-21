import { usePage } from '../index';
import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

describe('usePage', () => {
  beforeAll(() => {
		Vue.use(VueCompositionAPI);
	});
  it('should be defined', () => {
    expect(usePage).toBeDefined();
  });

  it('should useThrottle work', async () => {
    // TODO
  });
});
