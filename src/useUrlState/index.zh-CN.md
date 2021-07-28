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

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基础用法"
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

| 参数         | 说明                                                                     | 类型               | 默认值 |
| ------------ | ------------------------------------------------------------------------ | ------------------ | ------ |
| routerPushFn | 一般来说，传 vue-router 的 `router.push`方法就行                         | `function`         | -      |
| initialState | 默认值                                                                   | `S | (() => S)`    | -      |
| options      | 设置`localStorageKey`的话，若 url 没有参数，会使用存在 localStorage 的值 | UseUrlStateOptions | -      |

### Result

| 参数  | 说明   | 类型 |
| ----- | ------ | ---- |
| state | 状态值 | -    |
