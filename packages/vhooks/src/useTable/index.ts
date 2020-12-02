import { computed, Ref, watch, ComputedRef, isRef, ref } from 'vue-demi';
import { merge } from 'lodash-es';
import { useThrottle } from '../useThrottle';

function defaultCompareFn(a: any, b: any) {
  return a < b ? -1 : 1;
}

export type SortDirection = 'ascend' | 'descend';

export interface Page {
  index: number;
  size: number;
}

export interface Sort {
  key: string;
  direction: SortDirection;
  compareFn: (a: any, b: any) => number;
}

export interface Search {
  text: string;
  isReg: boolean;
  keys: string[];
}

export interface DefaultParams {
  page?: Partial<Page>;
  search?: Partial<Search>;
  sort?: Partial<Sort>;
}

export interface Pramas {
  page: Page;
  search: Search;
  sort: Sort;
}

const defaultParams = {
  page: {
    index: 1,
    size: 10,
  },
  search: {
    text: '',
    isReg: false,
    keys: [] as string[],
  },
  sort: {
    key: '',
    direction: 'ascend',
    compareFn: defaultCompareFn,
  },
} as Pramas;

export function useTable<T>(
  data: Ref<T[]> | T[],
  options?: DefaultParams,
): {
  data: Ref<T[]>;
  page: Ref<Page>;
  sort: Ref<Sort>;
  search: Ref<Search>;
  pagedData: ComputedRef<T[]>;
  total: ComputedRef<number>;
} {
  const { page: pageParams, sort: sortParams, search: searchParams } = merge(
    {},
    defaultParams,
    options,
  ) as Pramas;

  const dataRef = isRef(data) ? data : (computed(() => data) as Ref<T[]>);

  const page = ref<Page>(pageParams);
  const sort = ref<Sort>(sortParams);
  const search = ref<Search>(searchParams);

  const throlltedSearchText = useThrottle(() => search.value.text, {
    wait: 500,
  });

  const filtedList = computed(() => {
    let list = [...dataRef.value];
    // search
    const searchText = throlltedSearchText.value.trim();
    if (searchText) {
      list = list.filter((i) => {
        let iStr = '';
        if (search.value.keys?.length) {
          iStr = search.value.keys.map((key) => i[key as keyof T]).join(' ');
        } else {
          iStr = JSON.stringify(i);
        }

        if (search.value.isReg) {
          try {
            const matched = Boolean(iStr.match(new RegExp(searchText)));
            return matched;
          } catch {
            //
          }
        }
        return iStr
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
    }
    // sort
    if (sort.value.key) {
      list.sort((a: any, b: any) => {
        const key = sort.value.key;
        const sortResult = sort.value.compareFn(
          a[key as keyof T],
          b[key as keyof T],
        );
        return sort.value.direction === 'ascend' ? sortResult : sortResult * -1;
      });
    }
    return list;
  });

  const total = computed(() => filtedList.value.length);

  const pagedData = computed(() => {
    let list = [...filtedList.value];
    // page slice
    const start = (page.value.index - 1) * page.value.size;
    const end = start + page.value.size;
    list = list.slice(start, end);
    return list as T[];
  });

  watch(
    () => data,
    () => {
      search.value.text = '';
    },
  );

  watch(
    () => page.value.size,
    () => {
      page.value.index = 1;
    },
    {
      immediate: false,
    },
  );

  watch(
    () => filtedList.value,
    () => {
      page.value.index = 1;
    },
  );

  return {
    data: dataRef,
    page,
    search,
    sort,
    pagedData,
    total,
  };
}
