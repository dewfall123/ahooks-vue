import { useRequest } from '../index';

describe('useRequest', () => {
  it('should useRequest be defined', () => {
    expect(useRequest).toBeDefined();
  });

  it('should service params support string', async () => {
    const { data } = useRequest('https://www.v2ex.com/api/nodes/s2.json');
    debugger;
    expect(data).toEqual('');
  });
});
