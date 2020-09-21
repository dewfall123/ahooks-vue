import { useDocumentVisibility } from '../index';

import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

describe('useFullscreen', () => {
  beforeAll(() => {
		Vue.use(VueCompositionAPI);
	});
  it('should be defined', () => {
    expect(useDocumentVisibility).toBeDefined();
    // TODO
  });
});
