---
map:
  path: /hooks/use-size
---

# useSize

A hook to subscribe DOM element size change.

::: tip
The API is different from [ahooks](https://ahooks.js.org/hooks/dom/use-size).
:::

## Examples

### Basic usage

<demo src="./demo/demo1.vue"
  title="Basic usage"
  desc="using ref to listen to size change.">
</demo>

## API

```ts
const size = useSize(target);
```

### Params

| Property | Description               | Type                                                   | Default |
| -------- | ------------------------- | ------------------------------------------------------ | ------- |
| target   | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -       |
| options  | Object                    | -                                                      |

### Options

| 参数     | 类型     | 默认值    | 说明                 |
| -------- | -------- | --------- | -------------------- |
| onChange | Function | undefined | size change callback |

### Result

| Property | Description     | Type                              |
| -------- | --------------- | --------------------------------- |
| size     | size of the DOM | { width: number, height: number } |
