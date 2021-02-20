---
map:
  path: /use-local-storage-state
---

# useLocalStorageState

一个可以将状态持久化存储在 localStorage 中的 Hook。

::: warning
API 有改动，见[ahooks](https://ahooks.js.org/zh-CN/hooks/dom/use-document-visibility)。
:::

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="将 state 持久化在 localStorage 中"
  desc="刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。" >
</demo>

### 存储对象

<demo src="./demo/demo2.vue"
  language="vue"
  title="将 state 持久化在 localStorage 中"
  desc="刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。">
</demo>

## API

```typescript
const [state, setState] = useLocalStorageState<T>(
  key: string,
  defaultValue?: T | (() => T),
): T
```
