---
map:
  path: /use-document-visibility
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

```ts
const { isVisible, visibilityState } = useDocumentVisibility({
  onHidden,
  onVisible,
  onChange,
}: UseDocumentVisibilityOptions);
```

```ts
export interface UseDocumentVisibilityOptions {
  onHidden?: () => void;
  onVisible?: () => void;
  onChange?: (visibilityState: VisibilityState) => void;
}
```

### Params

| Property  |                         Description |     Type |                                      Default |
| --------- | ----------------------------------: | -------: | -------------------------------------------: |
| onHidden  |            Document hidden callback | Function |                                 `() => void` |
| onVisible |           Document visible callback | Function |                                 `() => void` |
| onChange  | Document visibility change callback | Function | `(visibilityState: VisibilityState) => void` |

### Result

| Property        |                          Description |    Type |                    Default |
| --------------- | -----------------------------------: | ------: | -------------------------: |
| visibilityState |             Document's visible state |  string |      `hidden` \| `visible` |
| isVisible       | Determine if the document is visible | boolean | `document.visibilityState` |
