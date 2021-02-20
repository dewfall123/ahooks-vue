---
map:
  path: /use-in-viewport
---

# useInViewport

A hook to subscribe DOM element visibility change.

::: tip
API is consistent with [ahooks](https://ahooks.js.org/zh-CN/hooks/dom/use-in-viewport).
:::

## Examples

### Basic usage

<demo src="./demo/demo1.vue"
  title="Basic usage"
  desc="Using ref to listen to visibility change.">
</demo>

## API

```ts
const inViewPort = useInViewport(target);
```

### Params

| Property | Description               | Type                                                         | Default |
| -------- | ------------------------- | ------------------------------------------------------------ | ------- |
| target   | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| React.MutableRefObject | -       |

### Result

| Property   | Description                                   | Type    |
| ---------- | --------------------------------------------- | ------- |
| inViewPort | Whether DOM elements are in the visible range | boolean |
