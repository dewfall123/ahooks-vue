---
map:
  path: /hooks/use-document-visibility
---

# useDocumentVisibility

A Hook can tell if the page is visible.

::: warning
The API is different from [ahooks](https://ahooks.js.org/zh-CN/hooks/dom/use-document-visibility).
:::

[visibilityState API](https://developer.mozilla.org/docs/Web/API/Document/visibilityState)

## Examples

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic Usage"
  desc="Listen to document visibility change.">
</demo>

## API

```typescript
const { isVisible, visibilityState } = useDocumentVisibility();
```

### Result

| Property        |                          Description |    Type |                    Default |
| --------------- | -----------------------------------: | ------: | -------------------------: |
| visibilityState |             Document's visible state |  string |      `hidden` \| `visible` |
| isVisible       | Determine if the document is visible | boolean | `document.visibilityState` |
