import { useTable } from '../index';
import { data } from '../demo/data';
import { nextTick } from 'vue-demi';

describe('useTable', () => {
  it('should be defined', () => {
    expect(useTable).toBeDefined();
  });

  it('should page setting work', async () => {
    const pageSize = 5;
    const { pagedList, page, total } = useTable(data, {
      page: { size: pageSize },
    });

    expect(total.value).toEqual(data.length);
    expect(pagedList.value.length).toEqual(pageSize);

    page.value.index = 2;
    await nextTick(() => {
      expect(pagedList.value.length).toEqual(data.length - pageSize);
    });

    page.value.size = 10;
    await nextTick(() => {
      expect(page.value.index).toEqual(1);
      expect(pagedList.value.length).toEqual(data.length);
    });
  });

  it('should sort setting work', async () => {
    const sortKey = 'age';
    const { pagedList, sort } = useTable(data, {
      sort: {
        key: sortKey,
      },
    });

    expect(pagedList.value).toEqual(
      pagedList.value.sort((a, b) => (a.age > b.age ? -1 : 1)),
    );

    sort.value.direction = 'descend';
    await nextTick(() => {
      expect(pagedList.value).toEqual(
        pagedList.value.sort((a, b) => (a.age > b.age ? 1 : -1)),
      );
    });

    sort.value.key = 'name';
    sort.value.compareFn = (a, b) => (a === 'Am' ? 1 : -1);
    await nextTick(() => {
      expect(pagedList.value[0].name).toEqual('Am');
    });
  });

  it('should search setting work', async () => {
    const searchText = 'dendi';
    const { pagedList, search, total } = useTable(data, {
      search: {
        text: searchText,
      },
    });

    expect(total.value).toEqual(1);
    expect(
      pagedList.value.every((item) =>
        JSON.stringify(item).includes(searchText),
      ),
    );

    search.value.text === 'Jim Green';
    await nextTick(() => {
      expect(
        pagedList.value.every((item) =>
          JSON.stringify(item).includes('Jim Green'),
        ),
      );
    });

    search.value.text = '39';
    search.value.keys = ['age'];
    await nextTick(() => {
      expect(pagedList.value.every((item) => item.age === 39));
    });
  });
});
