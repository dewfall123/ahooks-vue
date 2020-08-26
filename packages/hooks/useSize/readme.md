# useSize

一个用于监听 dom 节点尺寸变化的 Hook

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  title="基本用法"
  desc="使用 ref 监听节点尺寸变化">
</demo>

### 传入 DOM 节点

## API

```ts
const size = useSize(target);
```

### 参数

| 参数   | 说明              | 类型                                                   | 默认值 |
| ------ | ----------------- | ------------------------------------------------------ | ------ |
| target | DOM 节点或者 Refs | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -      |

### 结果

| 参数 | 说明           | 类型                              |
| ---- | -------------- | --------------------------------- |
| size | dom 节点的尺寸 | { width: number, height: number } |
