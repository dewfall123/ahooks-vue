import { useThrottle } from '../index';
import { ref } from 'vue';
import { sleep } from '../../../utils';

// vue2-import-slot

describe('useThrottle', () => {
  // vue2-beforeAll-slot
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
