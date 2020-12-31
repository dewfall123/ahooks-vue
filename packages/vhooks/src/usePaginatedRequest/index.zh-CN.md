---
map:
  path: /hooks/use-paginated-request
---

# useSize

集成分页功能的 useRequest。

::: tip
新增的 Hook。
:::

- 会额外返回 pagination 字段，包含所有分页信息，自动管理分页 current , pageSize 。
- service 的第一个参数为 {current, pageSize} 。
- service 返回的数据结构必须为 {list: Item[], total: number} ，如果不满足，可以通过 options.formatResult 转换一次。

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  title="基本用法"
  desc="集成分页功能。">
</demo>

## API

```ts
const {
  pagination: { current, pageSize, total, totalPage },
  loading,
  data,
} = usePaginatedRequest(({ current, pageSize }) =>
  getUserList({ current, pageSize }),
);
```

### 参数

- service 参数同`useRequest`，但是需要满足如下格式

```ts
type service = ([
  {
    current: number;
    pageSize: number;
  },
  ...any[]
]) => Promise<any>
```

返回的数据结构必须为 {list: Item[], total: number} ，如果不满足，可以通过 options.formatResult 转换一次。

### 结果

- 比`useRequest`多返回一个`pagination`数据。
