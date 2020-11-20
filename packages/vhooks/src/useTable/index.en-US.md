---
map:
  path: /hooks/use-table
---

# useTable

Hooks that handle Table-related logic, like frontend pagination, sort and search。

::: tip
New hook.
:::

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="front paged table.">
</demo>

## API

```javascript
const { pagedData, page, total, search } = useTable(
  data,
  defaultParams?: Object
);
```

### Params

| Property      | Description                          | Type   | Default              |
| ------------- | ------------------------------------ | ------ | -------------------- |
| data          | Table data array.                    | array  | -                    |
| defaultParams | See the defaultParams section below. | object | {page, sort, search} |

#### defaultParams.page

| Property | Description                   | Type   | Default |
| -------- | ----------------------------- | ------ | ------- |
| index    | Current page number           | number | 1       |
| size     | Number of data items per page | number | 10      |

#### defaultParams.sort

| Property  | Description                                      | Type     | Default            |
| --------- | ------------------------------------------------ | -------- | ------------------ |
| key       | Sort field.                                      | string   | ''                 |
| direction | supported sort way, could be `ascend`, `descend` | string   | `ascend`           |
| compareFn | Sort function for local sort.                    | function | `defaultCompareFn` |

#### defaultParams.search

| Property | Description                                          | Type    | Default |
| -------- | ---------------------------------------------------- | ------- | ------- |
| text     | Search content.                                      | string  | ''      |
| isReg    | True if Search content is regx.                      | boolean | false   |
| keys     | Search columns. If not set, will search all columns. | array   | []      |

#### defaultParams

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
