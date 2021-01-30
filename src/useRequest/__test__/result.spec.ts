import { useRequest } from '../index';
import 'whatwg-fetch';
import { getFullName, getFullNameTime, Name, Prefix } from '../demo/utils';
import { nextTickInFakeTimers } from './utils';

describe('useRequest - result', () => {
  const originalError = console.error;

  beforeAll(() => {
    jest.useFakeTimers();
    console.error = (...args: any) => {
      console.log(...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should loading + data + error work', async () => {
    const { loading, data, error } = useRequest(getFullName);

    expect(loading.value).toEqual(true);
    expect(data.value).toEqual(undefined);
    expect(error.value).toEqual(undefined);

    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();

    expect(loading.value).toEqual(false);
    expect(data.value).toEqual(Name);
    expect(error.value).toEqual(undefined);
  });

  it('should params and lastSuccessParams work', async () => {
    const { run, loading, params, lastSuccessParams } = useRequest(
      getFullName,
      {
        manual: true,
      },
    );
    const Name = 'yiyezhiqiu';
    expect(loading.value).toEqual(false);
    expect(params.value).toEqual([]);
    expect(lastSuccessParams.value).toEqual([]);
    run(Name);
    jest.runAllTimers();
    await nextTickInFakeTimers();

    expect(params.value).toEqual([Name]);
    expect(lastSuccessParams.value).toEqual([Name]);

    const args = ['quanzhi', true] as [string, boolean];
    run(...args);
    expect(params.value).toEqual(args);
    expect(lastSuccessParams.value).toEqual([Name]);
  });

  it('should cancel and refresh work', async () => {
    const onSuccess = jest.fn(name => {
      expect(name).toEqual(`${Prefix}${1}`);
    });
    let n = 1;
    const { data, loading, run, cancel, refresh } = useRequest(getFullName, {
      manual: true,
      onSuccess,
    });

    run(`${n++}`);
    jest.advanceTimersByTime(100);
    await nextTickInFakeTimers();
    expect(loading.value).toEqual(true);
    cancel();
    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();
    expect(loading.value).toEqual(false);
    expect(data.value).toEqual(undefined);
    expect(onSuccess).toHaveBeenCalledTimes(0);

    refresh();
    jest.runAllTimers();
    await nextTickInFakeTimers();
    expect(data.value).toEqual(`${Prefix}${1}`);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});
