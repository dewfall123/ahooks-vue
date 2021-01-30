import { sleep } from '../../utils';

export async function nextTickInFakeTimers() {
  jest.useRealTimers();
  await sleep(0);
  jest.useFakeTimers();
}
