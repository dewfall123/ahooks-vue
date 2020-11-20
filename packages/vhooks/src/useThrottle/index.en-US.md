---
map:
  path: /hooks/use-throttle
---

# useThrottle

A hook that handle the throttle value.

::: tip
API is consistent with [ahooks](https://ahooks.js.org/hooks/side-effect/use-throttle).
:::

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Defaut usage"
  desc="click the button fast, Look at what happens to second value">
</demo>

## API

```javascript
const throttledValue = useThrottle(
  value: any,
  options?: object
);
```

### Params

| Property | Description                                                  | Type      | Default |
| -------- | ------------------------------------------------------------ | --------- | ------- |
| value    | value that requires throttle                                 | `any`     | -       |
| options  | Config the throttle behavior. See the Options section below. | `Options` | `{}`    |

### Options

| Property | Description                                           | Type      | Default |
| -------- | ----------------------------------------------------- | --------- | ------- |
| wait     | The number of milliseconds to delay.                  | `number`  | `1000`  |
| leading  | Specify invoking on the leading edge of the timeout.  | `boolean` | `true`  |
| trailing | Specify invoking on the trailing edge of the timeout. | `boolean` | `true`  |
