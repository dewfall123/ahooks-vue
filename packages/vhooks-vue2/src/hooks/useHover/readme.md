## useFullscreen

一个用于追踪 dom 元素是否有鼠标悬停的 Hook

### 基本用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要需要监听的元素。">
</demo>

<demo src="./demo/demo2.vue"
  language="vue"
  title="传入Dom元素"
  desc="传入 function 并返回一个 dom 元素。">
</demo>

## API

```javascript
const isHovering = useHover(
  target, 
  {
   onEnter,
   onLeave
  }
);
```

### 结果

| 参数     | 说明                                     | 类型       |
|----------|------------------------------------------|------------|
| isHovering  | 判断鼠标元素是否处于 hover 元素                  | boolean    |

### 参数

| 参数    | 说明                                         | 类型                   | 默认值 |
|---------|----------------------------------------------|------------------------|--------|
| target | DOM 节点或者 Ref 对象  | (() => HTMLElement) \| HTMLElement \| React.RefObject | - |
| onEnter | 监听进入 hover  | ()=>void | -      |
| onLeave | 监听离开 hover  | ()=>void | -      |