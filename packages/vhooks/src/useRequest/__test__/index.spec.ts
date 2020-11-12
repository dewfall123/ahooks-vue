import { useRequest } from '../index';
import 'whatwg-fetch';
import { getFullName, Name } from '../demo/utils';

describe('useRequest - service params', () => {
  it('should useRequest be defined', () => {
    expect(useRequest).toBeDefined();
  });

  // it('should service params support string', async done => {
  //   const { data } = useRequest(testUrl, {
  //     onSuccess(res) {
  //       expect(res[0].id).toEqual(80);
  //       done();
  //     },
  //   });
  //   expect(data.value).toEqual(undefined);
  // });

  // it('should service params support object', async done => {
  //   const { data } = useRequest(
  //     { url: testUrl },
  //     {
  //       onSuccess(res) {
  //         expect(res[0].id).toEqual(80);
  //         done();
  //       },
  //     },
  //   );

  //   expect(data.value).toEqual(undefined);
  // });

  // it('should service params support function', async done => {
  //   const { data } = useRequest(() => testUrl, {
  //     onSuccess(res) {
  //       expect(res[0].id).toEqual(80);
  //       done();
  //     },
  //   });
  //   expect(data.value).toEqual(undefined);

  //   useRequest(() => ({ url: testUrl }), {
  //     onSuccess(res) {
  //       expect(res[0].id).toEqual(80);
  //       done();
  //     },
  //   });
  // });

  it('should server params support async function', async (done) => {
    useRequest(getFullName, {
      onSuccess(res) {
        expect(res).toEqual(Name);
        done();
      },
    });
  });
});
