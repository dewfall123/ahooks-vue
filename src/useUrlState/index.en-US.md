---
map:
  path: /use-url-state
---

# useUrlState

一个同步组件内部状态和 query 参数的 hook。

::: warning
API 有改动，见[ahooks](https://ahooks.js.org/zh-CN/hooks/state)。
:::

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="同步条件到url，在需要通过url分享复杂参数场景十分有用">
</demo>

## API

```typescript
const state = useUrlState(routerPush, DefaultState, {
  localStorageKey: 'localStorageKey',
});

interface UseUrlStateOptions {
  localStorageKey?: string;
}
```

### Params

| Property     | Description                                                                                                           | Type            | Default |
| ------------ | --------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| routerPushFn | Pass `router.push`                                                                                                    | `function`      | -       |
| initialState | defaultValue                                                                                                          | `S | (() => S)` | -       |
| options      | If set the `options.localStorageKey` is set, state will use the state saved in localStorage when url params is empty. | UseUrlStateOptions  | -       |

### Result

| Property | Description | Type |
| -------- | ----------- | ---- |
| state    | state ref   | -    |
