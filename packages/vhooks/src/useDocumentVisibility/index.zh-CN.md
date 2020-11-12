# useDocumentVisibility

可以获取页面可见状态的 Hook。

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听 document 的可见状态">
</demo>

### 参数

| 参数            |                        说明 |    类型 |                                 值 |
| --------------- | --------------------------: | ------: | ---------------------------------: |
| visibilityState | document.visibilityState 值 |  string | `hidden` \| `visible` \| undefined |
| isVisible       |                页面是否可见 | boolean |         `document.visibilityState` |
