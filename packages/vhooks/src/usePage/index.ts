import { computed, reactive, toRefs, Ref, watch } from 'vue-demi';
import { merge } from 'lodash-es';
import { useThrottle } from '../useThrottle';

function defaultCompareFn(a: any, b: any) {
  return a < b;
}

interface Page {
  index: number;
  size: number;
}

interface Sort {
  key: string;
  desc: boolean;
  compareFn: (a: any, b: any) => boolean;
}

interface Search {
  text: string;
  isReg: boolean;
  keys: string[];
}

interface Options {
  page?: Page;
  size?: number;
  search?: Search;
  sort?: Sort;
}

const defaultOptions = {
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
    desc: true,
    compareFn: defaultCompareFn,
  },
} as Options;

export function usePage<T>(list: Ref<T[]> | T[], options?: Options) {
  const { page, sort, search } = merge({}, options, defaultOptions);

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
        const isGreater = state.sort.compareFn(
          a[key as keyof T],
          b[key as keyof T],
        );
        let t = isGreater ? -1 : 1;
        if (state.sort.desc) {
          t *= -1;
        }
        return t;
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

  function onSortChange({
    column,
    key,
    order,
  }: {
    column: any;
    key: string;
    order: 'desc' | 'asc' | 'normal';
  }) {
    if (order === 'normal') {
      state.sort.key = '';
      return;
    }
    state.sort.key = column.sortKey || key;
    state.sort.desc = order === 'desc';
  }

  watch(
    () => state.list,
    () => {
      state.search.text = '';
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
    onSortChange,
  };
}
