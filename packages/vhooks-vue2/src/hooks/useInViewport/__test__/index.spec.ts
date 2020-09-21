import { useInViewport } from '../index';

import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

describe('useHover', () => {
  beforeAll(() => {
		Vue.use(VueCompositionAPI);
	});
  it('should be defined', () => {
    expect(useInViewport).toBeDefined();
    // TODO
  });
});
