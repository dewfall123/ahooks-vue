import { AxiosRequestConfig } from 'axios';

export type UseAxiosParams = AxiosRequestConfig | (() => AxiosRequestConfig);
