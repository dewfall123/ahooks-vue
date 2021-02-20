---
map:
  path: /use-size
---

# useSize

一个用于监听 dom 节点尺寸变化的 Hook。

::: tip
API 有改动，见[ahooks](https://ahooks.js.org/hooks/dom/use-size)。
:::

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  title="基本用法"
  desc="使用 ref 监听节点尺寸变化。">
</demo>

### 传入 DOM 节点

## API

```ts
const size = useSize(target);
```

### 参数

| 参数    | 说明              | 类型                                                   | 默认值 |
| ------- | ----------------- | ------------------------------------------------------ | ------ |
| target  | DOM 节点或者 Refs | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -      |
| options | Object            | 可选参数                                               |

### Options

| 参数     | 类型     | 默认值    | 说明                |
| -------- | -------- | --------- | ------------------- |
| onChange | Function | undefined | size 变化的回调函数 |

### 结果

| 参数 | 说明           | 类型                              |
| ---- | -------------- | --------------------------------- |
| size | dom 节点的尺寸 | { width: number, height: number } |
