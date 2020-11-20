---
map:
  path: /hooks/use-debounce
---

# useDebounce

A hook that handle the debounce value.

::: tip
API is consistent with [ahooks](https://ahooks.js.org/zh-CN/hooks/side-effect/use-debounce).
:::

## Examples

### Default usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Click the button, debouncedValue will change after the input ends 1000ms.">
</demo>

## API

```javascript
const debouncedValue = useDebounce(
  value: any,
  options?: Options
);
```

### Params

| Property | Description                                                  | Type      | Default |
| -------- | ------------------------------------------------------------ | --------- | ------- |
| value    | value that requires debounce                                 | `any`     | -       |
| options  | Config the debounce behavior. See the Options section below. | `Options` | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `false` |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
