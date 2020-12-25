import { UseRequestOptions, UseRequestResult } from '../useRequest';

export type PaginatedParams = [
  {
    current: number;
    pageSize: number;
    // sorter?: Sorter;
    // filters?: Filter;
  },
  ...any[]
];

export type Service<R, P extends any[]> = (...args: P) => Promise<R>;

export interface UsePaginatedRequestOptions<Item>
  extends UseRequestOptions<PaginationResult<Item>, PaginatedParams> {
  defaultPagination: {
    current: number;
    pageSize: number;
  };
}

export interface PaginationResult<Item> {
  total: number;
  list: Item[];
}

export interface UsePaginatedRequestResult<Item>
  extends UseRequestResult<PaginationResult<Item>, PaginatedParams> {
  pagination: {
    current: number;
    pageSize: number;
    total: number;
    totalPage: number;
  };
}
