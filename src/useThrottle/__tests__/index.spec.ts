import { useThrottle } from '../index';
import { ref } from 'vue-demi';
import { sleep } from '../../utils';

describe('useThrottle', () => {
  it('should be defined', () => {
    expect(useThrottle).toBeDefined();
  });

  it('should useThrottle work', async () => {
    const count = ref(0);
    const throttledCount = useThrottle(count, { wait: 200 });
    count.value++;
    count.value++;
    expect(count.value).toEqual(2);
    expect(throttledCount.value).toEqual(0);
    await sleep(300);
    expect(throttledCount.value).toEqual(2);
  });
});
