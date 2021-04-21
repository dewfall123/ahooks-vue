---
map:
  path: /use-fullscreen
---

# useFullscreen

一个用于处理 dom 全屏的 Hook

::: tip
Api 与[ahooks](https://ahooks.js.org/zh-CN/hooks/dom/use-fullscreen)一致。
:::

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  language="vue"
  desc="使用 ref 设置需要全屏的元素。">
</demo>

### 传入目标元素

<demo src="./demo/demo2.vue"
  language="vue"
  desc="传入一个元素。">
</demo>

## API

```typescript
const [isFullscreen, { setFull, exitFull, toggleFull }] = useFullScreen(target, options?:Options);
```

### Params

| 参数    | 说明                  | 类型                                 | 默认值 |
| ------- | --------------------- | ------------------------------------ | ------ |
| target  | DOM 节点或者 Ref 对象 | `HTMLElement` \| `() => HTMLElement` |
| options | 设置(可选)            | `Options`                            | -      |

### Options

| 参数       | 说明         | 类型       | 默认值 |
| ---------- | ------------ | ---------- | ------ |
| onExitFull | 监听退出全屏 | `()=>void` | -      |
| onFull     | 监听全屏     | `()=>void` | -      |

### Result

| 参数         | 说明     | 类型       |
| ------------ | -------- | ---------- |
| isFullscreen | 是否全屏 | `boolean`  |
| setFull      | 设置全屏 | `()=>void` |
| exitFull     | 退出全屏 | `()=>void` |
| toggleFull   | 切换全屏 | `()=>void` |
