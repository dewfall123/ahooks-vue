import { ComputedRef, Ref, UnwrapRef } from 'vue-demi';

export enum OPERATOR {
  '等于' = '=',
  '大于' = '>',
  '小于' = '<',
  '大于等于' = '>=',
  '小于等于' = '<=',
  '不等于' = '!=',
}

export type DimensionOptions =
  | Ref<Record<string, string>>
  | Record<string, string>;

export type CountField = '_count';
export const COUNT_FIELD = '_count';

export type MeasuresOptions =
  | Ref<Record<string, string>>
  | Record<string, string>;

export interface PassedInCubeOptions {
  dimensions?: DimensionOptions;
  series?: DimensionOptions;
  measures?: MeasuresOptions;
}

export type CubeOptions = ComputedRef<{
  dimension: Record<string, string>;
  measure: Record<string, string>;
  series: Record<string, string>;
}>;

export interface CubeSettings<T> {
  dimension?: keyof T | UnwrapRef<keyof T>;
  series?: keyof T | UnwrapRef<keyof T>;
  measure?: keyof T | UnwrapRef<keyof T> | CountField;
  //
  countField?: string;
}

export interface Filter<T> {
  field: keyof T | '';
  operator: OPERATOR;
  value: any;
}

export type SourceData<T> = Ref<T[]> | T[];
export type SourceDataRef<T> = Ref<T[]>;

export type Columns<T> = Ref<Record<keyof T, string>> | Record<keyof T, string>;
export type ColumnsRef<T> = Ref<Record<keyof T, string>>;

export type Cube = ComputedRef<
  {
    [x: string]: string | number;
  }[]
>;

export type ChartCube = ComputedRef<{
  columns: string[];
  rows: {
    [x: string]: string | number;
  }[];
}>;
