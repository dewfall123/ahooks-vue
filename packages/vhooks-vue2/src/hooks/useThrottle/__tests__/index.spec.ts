import { useThrottle } from '../index';
import { ref } from '@vue/composition-api';
import { sleep } from '../../../utils';

import VueCompositionAPI from '@vue/composition-api';
import Vue from 'vue';

describe('useThrottle', () => {
  beforeAll(() => {
		Vue.use(VueCompositionAPI);
	});
  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should useThrottle work', async () => {
    const count = ref(0);
    const throttledCount = useThrottle(count, 200);
    count.value++;
    count.value++;
    expect(count.value).toEqual(2);
    expect(throttledCount.value).toEqual(0);
    await sleep(300);
    expect(throttledCount.value).toEqual(2);
  });
});
