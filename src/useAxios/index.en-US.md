---
map:
  path: /use-axios
---

# useAxios

wrap `useRequest` with axios.

::: tip
A new hook.
:::

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Defaut usage"
  desc="Fetch data.">
</demo>

## API

```javascript
const throttledValue = Axios(
  params: AxiosRequestConfig | (() => AxiosRequestConfig),
  options?: object
);
```

### Params

| Property | Description               | Type                   | Default |
| -------- | ------------------------- | ---------------------- | ------- |
| params   | Same as axios.request     | `Object` of `Function` | -       |
| options  | The same as `useRequest`. | `Options`              | `{}`    |
