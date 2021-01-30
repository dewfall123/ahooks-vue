import { UseRequestOptions, UseRequestResult } from '../useRequest';

export type PaginatedParams = [
  {
    current: number;
    pageSize: number;
  },
  ...any[],
];

export type PaginatedCombineService =
  | ((...p: PaginatedParams) => Promise<any>)
  | ((...p: PaginatedParams) => { [key: string]: any });

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
