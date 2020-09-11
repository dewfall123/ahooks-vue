import { useThrottle } from '../index';
import { ref } from 'vue';
import { sleep } from '../../../utils';

describe('useThrottle', () => {
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
    sleep(250);
    expect(throttledCount.value).toEqual(2);
  });
});
