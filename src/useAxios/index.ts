import Axios, { AxiosResponse } from 'axios';
import {
  BaseUseRequestOptions,
  useRequest,
  UseRequestOptions,
  UseRequestOptionsWithFormatResult,
  UseRequestOptionsWithInitialData,
  UseRequestResult,
} from '../index';
import { UseAxiosParams } from './types';

// 同时有formateResult initialData
export function useAxios<R = any, P extends any[] = any, SR = any>(
  params: UseAxiosParams<P>,
  options: UseRequestOptionsWithFormatResult<R, P, AxiosResponse<SR>> &
    UseRequestOptionsWithInitialData<R, P>,
): UseRequestResult<R, P>;

// 仅有formateResult
export function useAxios<R = any, P extends any[] = any, SR = any>(
  params: UseAxiosParams<P>,
  options: UseRequestOptionsWithFormatResult<R, P, AxiosResponse<SR>>,
): UseRequestResult<R | undefined, P>;

// 仅有initialData
export function useAxios<R = any, P extends any[] = any>(
  params: UseAxiosParams<P>,
  options: UseRequestOptionsWithInitialData<R, P>,
): UseRequestResult<R, P>;

// 无formateResult initialData
export function useAxios<R = any, P extends any[] = any>(
  params: UseAxiosParams<P>,
  options: Partial<BaseUseRequestOptions<R, P>>,
): UseRequestResult<R | undefined, P>;

export function useAxios<R = any, P extends any[] = any>(
  params: UseAxiosParams<P>,
  options: Partial<UseRequestOptions<R, P>> = {},
) {
  return useRequest<R, P>(params, {
    ...options,
    requestMethod: Axios.request,
  });
}
