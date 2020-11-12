import { useRequest } from '../index';
import 'whatwg-fetch';
import {
  Error,
  getNumber,
  getNumberTime,
  // getNumber,
  // getNumberTime,
  getFullName,
  getFullNameTime,
  Name,
  Prefix,
} from '../demo/utils';
import { nextTickInFakeTimers } from './utils';
import { sleep } from '../../utils';

describe('useRequest - options', () => {
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

  it('should manual work', async () => {
    const { data, loading, run } = useRequest(getFullName, {
      manual: true,
    });

    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();

    expect(data.value).toEqual(undefined);
    expect(loading.value).toEqual(false);

    run();

    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();
    expect(data.value).toEqual(Name);
    expect(loading.value).toEqual(false);
  });

  it('should initialData work', async () => {
    const initialName = 'yeyushengfan';
    const { data } = useRequest(getFullName, {
      initialData: initialName,
    });

    expect(data.value).toEqual(initialName);

    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();

    expect(data.value).toEqual(Name);
  });

  it('should formatResult and onSuccess work', async (done) => {
    const nameWithPrefix = `${Prefix}${Name}`;
    const { data } = useRequest(getFullName, {
      formatResult(name) {
        return Prefix + name;
      },
      onSuccess(res) {
        expect(data.value).toEqual(nameWithPrefix);
        expect(res).toEqual(nameWithPrefix);
        done();
      },
    });
    jest.runAllTimers();
  });

  it('shoudld onError work', async () => {
    jest.useRealTimers();

    const errorCallback = jest.fn((err) => {
      expect(err).toEqual(Error);
    });

    useRequest(() => getFullName('', true), {
      onError: errorCallback,
    });

    const { run, error } = useRequest(() => getFullName('', true), {
      manual: true,
    });

    expect(error.value).toEqual(undefined);

    try {
      await run();
    } catch (err) {
      expect(false);
    }

    expect(error.value).toEqual(Error);
    expect(errorCallback).toHaveBeenCalled();
  });

  it('should throwOnError work', async () => {
    jest.useRealTimers();
    console.error = console.log;
    const { run, error } = useRequest(() => getFullName('', true), {
      manual: true,
      throwOnError: true,
    });

    try {
      await run();
    } catch (err) {
      expect(error.value).toEqual(Error);
    }
  });

  it('should defaultParams work', async () => {
    jest.useFakeTimers();
    const passedName = 'tangrou';
    const { data, loading } = useRequest(getFullName, {
      defaultParams: [passedName],
    });

    expect(loading.value).toEqual(true);
    expect(data.value).toEqual(undefined);

    jest.advanceTimersByTime(getFullNameTime);
    await nextTickInFakeTimers();

    expect(loading.value).toEqual(false);
    expect(data.value).toEqual(`${Prefix}${passedName}`);
  });

  it('should loadingDelay work', async () => {
    const { loading, run } = useRequest(getNumber, {
      manual: true,
      loadingDelay: getNumberTime,
    });

    expect(loading.value).toEqual(false);
    run();
    expect(loading.value).toEqual(false);
    jest.advanceTimersByTime(getNumberTime);
    await nextTickInFakeTimers();
    expect(loading.value).toEqual(false);
  });

  it('should pollingInterval work', async () => {
    jest.useRealTimers();
    const onSuccess = jest.fn((res) => {
      expect(res).toEqual(Name);
    });
    const pollingInterval = 100;
    const { cancel } = useRequest(getFullName, {
      pollingInterval,
      onSuccess,
    });
    await sleep(getFullNameTime);
    expect(onSuccess).toHaveBeenCalledTimes(1);

    await sleep(getFullNameTime + pollingInterval + 10);
    expect(onSuccess).toHaveBeenCalledTimes(2);

    await sleep(getFullNameTime + pollingInterval + 10);
    expect(onSuccess).toHaveBeenCalledTimes(3);

    cancel();
  });

  it('should debounceInterval work', async () => {
    jest.useRealTimers();
    const onSuccess = jest.fn((res) => {
      expect(res).toEqual(Name);
    });

    const { loading, run } = useRequest(getFullName, {
      debounceInterval: 500,
      manual: true,
      onSuccess,
    });

    expect(loading.value).toEqual(false);
    run();
    expect(loading.value).toEqual(true);

    await sleep(100);
    run();
    await sleep(100);
    run();
    await sleep(100);

    await sleep(getFullNameTime + 500);
    expect(loading.value).toEqual(false);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should loadingWhenDebounceStart work', async () => {
    jest.useRealTimers();
    const onSuccess = jest.fn((res) => {
      expect(res).toEqual(Name);
    });

    const { loading, run } = useRequest(getFullName, {
      debounceInterval: 500,
      manual: true,
      loadingWhenDebounceStart: false,
      onSuccess,
    });

    expect(loading.value).toEqual(false);
    run();
    expect(loading.value).toEqual(false);

    await sleep(100);
    run();
    await sleep(100);
    run();
    await sleep(100);

    await sleep(500);
    expect(loading.value).toEqual(true);

    await sleep(getFullNameTime);
    expect(loading.value).toEqual(false);
    expect(onSuccess).toHaveBeenCalledTimes(1);
  });

  it('should throttleInterval work', async () => {
    jest.useRealTimers();
    const onSuccess = jest.fn();
    const { loading, run } = useRequest(getNumber, {
      throttleInterval: getNumberTime + 100,
      manual: true,
      onSuccess,
    });

    expect(loading.value).toEqual(false);
    run();
    expect(loading.value).toEqual(true);
    await sleep(100);
    run();
    await sleep(100);
    run();
    await sleep(100);
    run();

    await sleep(getNumberTime * 2);
    expect(loading.value).toEqual(false);
    expect(onSuccess).toHaveBeenCalledTimes(2);
  });

  it('should defaultLoading work', async () => {
    const { loading } = useRequest(getFullName, {
      defaultLoading: true,
    });

    expect(loading.value).toEqual(true);

    const { loading: loading1 } = useRequest(getFullName, {
      defaultLoading: true,
      manual: true,
    });

    expect(loading1.value).toEqual(true);
  });
});
