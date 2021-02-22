import { AxiosRequestConfig } from 'axios';

export type UseAxiosParams<P extends any[]> =
  | AxiosRequestConfig
  | ((...args: P) => AxiosRequestConfig);
