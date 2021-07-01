import { getCurrentInstance, inject, reactive, watch } from 'vue';
import { RequestConfig, useRequest } from '../useRequest';
import {
  PaginatedCombineService,
  PaginatedParams,
  PaginationResult,
  UsePaginatedRequestOptions,
  UsePaginatedRequestResult,
} from './types';

const defaultPagination = {
  current: 1,
  pageSize: 10,
};
/*
  参数格式固定 ()
  返回格式需要固定 
*/
export function usePaginatedRequest<Item = any>(
  service: PaginatedCombineService,
  options: Partial<UsePaginatedRequestOptions<Item>> = {},
): UsePaginatedRequestResult<Item> {
  let contextConfig = {} as Partial<UsePaginatedRequestOptions<Item>>;
  if (getCurrentInstance()) {
    contextConfig =
      inject<Partial<UsePaginatedRequestOptions<Item>>>(RequestConfig) ?? {};
  }
  const finalOptions = { defaultPagination, ...contextConfig, ...options };

  const pagination = reactive({
    current: finalOptions.defaultPagination!.current,
    pageSize: finalOptions.defaultPagination!.pageSize,
    total: (((finalOptions.initialData as unknown) as any[]) ?? []).length ?? 0,
    totalPage: 0,
  });

  const { data, run, params, ...rest } = useRequest<
    PaginationResult<Item>,
    PaginatedParams
  >(service, {
    defaultParams: [
      {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    ],
    ...finalOptions,
    onSuccess(data, params) {
      pagination.total = data.total;
      pagination.totalPage = Math.ceil(data.total / pagination.pageSize);
      if (finalOptions.onSuccess) {
        finalOptions.onSuccess(data, params);
      }
    },
  });

  watch([() => pagination.current, () => pagination.pageSize], () => {
    run(pagination, ...params.value.slice(1));
  });

  return {
    data,
    pagination,
    run,
    params,
    ...rest,
  };
}
