import { computed, reactive, toRefs, Ref, watch } from 'vue-demi';
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

export function useTable<T>(list: Ref<T[]> | T[], options?: DefaultParams) {
  const { page, sort, search } = merge({}, defaultParams, options) as Pramas;

  const state = reactive({
    list,
    page: page!,
    sort: sort!,
    search: search!,
  });

  const throlltedSearchText = useThrottle(() => state.search.text, {
    wait: 500,
  });

  const filtedList = computed(() => {
    let list = [...state.list];
    // search
    const searchText = throlltedSearchText.value.trim();
    if (searchText) {
      list = list.filter((i) => {
        let iStr = '';
        if (state.search.keys?.length) {
          iStr = state.search.keys.map((key) => i[key as keyof T]).join(' ');
        } else {
          iStr = JSON.stringify(i);
        }

        if (state.search.isReg) {
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
    if (state.sort.key) {
      list.sort((a: any, b: any) => {
        const key = state.sort.key;
        const sortResult = state.sort.compareFn(
          a[key as keyof T],
          b[key as keyof T],
        );
        return state.sort.direction === 'ascend' ? sortResult : sortResult * -1;
      });
    }
    return list;
  });

  const total = computed(() => filtedList.value.length);

  const pagedList = computed(() => {
    let list = [...filtedList.value];
    // page slice
    const start = (state.page.index - 1) * state.page.size;
    const end = start + state.page.size;
    list = list.slice(start, end);
    return list;
  });

  watch(
    () => state.list,
    () => {
      state.search.text = '';
    },
  );

  watch(
    () => state.page.size,
    () => {
      state.page.index = 1;
    },
    {
      immediate: false,
    },
  );

  watch(
    () => filtedList.value,
    () => {
      state.page.index = 1;
    },
  );

  return {
    ...toRefs(state),
    pagedList,
    total,
  };
}
