---
map:
  path: /use-local-storage-state
---

# useLocalStorageState

A Hook for persisting state into localStorage.

::: warning
The API is different from [ahooks](https://ahooks.js.org/zh-CN/hooks/dom/use-document-visibility).
:::

## Examples

### Basic Usage

<demo src="./demo/demo1.vue"
  language="vue"
  title="use value from localStorage"
  desc="refresh the page, the value recovered from localStorage." >
</demo>

### Object

<demo src="./demo/demo2.vue"
  language="vue"
  title="use object from localStorage"
  desc="refresh the page, the value recovered from localStorage.">
</demo>

## API

```typescript
const state = useLocalStorageState<T>(
  key: string,
  defaultValue?: T | (() => T),
): T
```
