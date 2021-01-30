import Axios from 'axios';
import { useRequest, UseRequestOptions } from '../index';
import { UseAxiosParams } from './types';

export function useAxios<R = any, P extends any[] = any>(
  params: UseAxiosParams,
  options: Partial<UseRequestOptions<R, P>> = {},
) {
  return useRequest<R, P>(params, {
    ...options,
    requestMethod: Axios.request,
  });
}
