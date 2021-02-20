---
map:
  path: /use-paginated-request
---

# usePaginatedRequest

Wrap useRequest in pagination mode。

::: tip
A new Hook。
:::

- Additional pagination field will be returned, which contains all pagination information.
- The first parameter of service is {current, pageSize}.
- The data structure returned by service must be {list: Item [], total: number}. If it is not satisfied, it can be converted once by options.formatResult.

## Examples

### Basic Usage

<demo src="./demo/demo.vue"
  title="Basic Usage"
  desc="Run useRequest in pagination mode.">
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

### Params

- The service params's type:

```ts
type service = ([
  {
    current: number;
    pageSize: number;
  },
  ...any[]
]) => Promise<any>
```

The data structure returned by service must be {list: Item [], total: number}. If it is not satisfied, it can be converted once by options.formatResult.

### Result

- Additional `pagination` field will be returned, which contains all pagination information.
