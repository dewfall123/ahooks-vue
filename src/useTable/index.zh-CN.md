---
map:
  path: /use-table
---

# useTable

纯前端 Table 相关逻辑的 hooks，例如分页，排序，搜索。

::: tip
新增的 Hook。
:::

## 代码演示

### 基础使用

<demo src="./demo/demo.vue"
  language="vue"
  title="基础用法"
  desc="封装表格的相关逻辑，包括前端分页，搜索，排序。">
</demo>

## API

```javascript
const { pagedData, page, total, search } = useTable(
  data,
  defaultParams?: Object
);
```

### 参数

| 参数          | 说明          | 类型   | 默认值               |
| ------------- | ------------- | ------ | -------------------- |
| data          | 表格数据.     | array  | -                    |
| defaultParams | 设置默认参数. | object | {page, sort, search} |

#### defaultParams.page

| 参数  | 说明     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| index | 当前页码 | number | 1      |
| size  | 每页数量 | number | 10     |

#### defaultParams.sort

| 参数      | 说明                                              | 类型     | 默认值             |
| --------- | ------------------------------------------------- | -------- | ------------------ |
| key       | 根据此字段排序                                    | string   | ''                 |
| direction | 设置排序是降序还是升序，取值为 `ascend` `descend` | string   | `ascend`           |
| compareFn | 比较函数                                          | function | `defaultCompareFn` |

#### defaultParams.search

| 参数  | 说明                                     | 类型    | 默认值 |
| ----- | ---------------------------------------- | ------- | ------ |
| text  | 搜索内容                                 | string  | ''     |
| isReg | 是否使用正则搜索                         | boolean | false  |
| keys  | 需要搜索哪些字段，如果不传则搜索所有字段 | array   | []     |

#### 默认参数值

```ts
const defaultParams = {
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
    direction: 'ascend',
    compareFn: defaultCompareFn,
  },
};
```

```ts
function defaultCompareFn(a: any, b: any) {
  return a < b ? -1 : 1;
}
```
