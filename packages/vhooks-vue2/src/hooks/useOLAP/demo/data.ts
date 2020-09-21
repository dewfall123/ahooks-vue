export interface DataSchema {
  date: string;
  name: string;
  age: number;
  action: 'push' | 'pull';
  score?: number;
}

export const data = [
  { date: '2020-08-05', name: 'a', age: 18, action: 'push', score: 13 },
  { date: '2020-08-05', name: 'b', age: 20, action: 'pull', score: 0 },
  { date: '2020-08-05', name: 'c', age: 24, action: 'push', score: 4 },
  { date: '2020-08-05', name: 'd', age: 22, action: 'pull', score: 3 },
  { date: '2020-08-06', name: 'a', age: 18, action: 'pull', score: -3 },
  { date: '2020-08-06', name: 'd', age: 22, action: 'push', score: 9 },
  { date: '2020-08-07', name: 'b', age: 20, action: 'pull', score: 15 },
  { date: '2020-08-07', name: 'c', age: 24, action: 'push', score: 0 },
  { date: '2020-08-08', name: 'a', age: 18, action: 'push', score: 1 },
  { date: '2020-08-08', name: 'd', age: 22, action: 'pull', score: 17 },
  { date: '2020-08-09', name: 'a', age: 18, action: 'push' },
] as DataSchema[];

export const dimensionOptionsArg = {
  date: '日期',
  action: '操作',
} as Record<keyof DataSchema, string>;

export const measureOptionsArg = {
  score: '得分',
} as Record<keyof DataSchema, string>;

export const seriesOptionsArg = {
  name: '名称',
} as Record<keyof DataSchema, string>;

export const columns = {
  date: '日期',
  name: '名称',
  age: '年龄',
  action: '操作',
  score: '得分',
} as Record<keyof DataSchema, string>;

export const date__count = [
  { date: '2020-08-05', _count: 4 },
  { date: '2020-08-06', _count: 2 },
  { date: '2020-08-07', _count: 2 },
  { date: '2020-08-08', _count: 2 },
  { date: '2020-08-09', _count: 1 },
];

export const name__count = [
  { name: 'a', _count: 4 },
  { name: 'b', _count: 2 },
  { name: 'c', _count: 2 },
  { name: 'd', _count: 3 },
];

export const name_score = [
  { name: 'a', score: 11 },
  { name: 'b', score: 15 },
  { name: 'c', score: 4 },
  { name: 'd', score: 29 },
];

export const date_name_score = [
  { date: '2020-08-05', name: 'a', score: 13 },
  { date: '2020-08-05', name: 'b', score: 0 },
  { date: '2020-08-05', name: 'c', score: 4 },
  { date: '2020-08-05', name: 'd', score: 3 },
  { date: '2020-08-06', name: 'a', score: -3 },
  { date: '2020-08-06', name: 'd', score: 9 },
  { date: '2020-08-07', name: 'b', score: 15 },
  { date: '2020-08-07', name: 'c', score: 0 },
  { date: '2020-08-08', name: 'a', score: 1 },
  { date: '2020-08-08', name: 'd', score: 17 },
  { date: '2020-08-09', name: 'a', score: 0 },
];

export const name_date_score = [
  { name: 'a', date: '2020-08-05', score: 13 },
  { name: 'a', date: '2020-08-06', score: -3 },
  { name: 'a', date: '2020-08-08', score: 1 },
  { name: 'a', date: '2020-08-09', score: 0 },
  { name: 'b', date: '2020-08-05', score: 0 },
  { name: 'b', date: '2020-08-07', score: 15 },
  { name: 'c', date: '2020-08-05', score: 4 },
  { name: 'c', date: '2020-08-07', score: 0 },
  { name: 'd', date: '2020-08-05', score: 3 },
  { name: 'd', date: '2020-08-06', score: 9 },
  { name: 'd', date: '2020-08-08', score: 17 },
];

export const date_score = [
  { date: '2020-08-05', score: 20 },
  { date: '2020-08-06', score: 6 },
  { date: '2020-08-07', score: 15 },
  { date: '2020-08-08', score: 18 },
  { date: '2020-08-09', score: 0 },
];

export const date__count_filtered_age = [
  { date: '2020-08-05', _count: 3 },
  { date: '2020-08-06', _count: 1 },
  { date: '2020-08-07', _count: 2 },
  { date: '2020-08-08', _count: 1 },
];
