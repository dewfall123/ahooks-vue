---
map:
  path: /use-axios
---

# useAxios

`useRequest`的 axios 封装 Hook。

::: tip
新增的 hook。
:::

## 代码演示

### 基础使用

<demo src="./demo/demo.vue"
  language="vue"
  title="基础用法"
  desc="查询数据">
</demo>

## API

```javascript
const { loading, data } = useAxios(
  params: AxiosRequestConfig | ((...args: P) => AxiosRequestConfig),
  options?: object
);
```

### 参数

| 参数    | 说明                      | 类型                   | 默认值 |
| ------- | ------------------------- | ---------------------- | ------ |
| params  | `AxiosRequestConfig` 对象 | `Object` or `Function` | -      |
| options | 与`useRequest`相同        | object                 | {}     |
