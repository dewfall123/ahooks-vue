---
map:
  path: /hooks/use-hover
---

# useHover

React UI sensor hooks that track if some element is being hovered by a mouse.

::: tip
API is consistent with [ahooks](https://ahooks.js.org/zh-CN/hooks/side-effect/use-hover).
:::

## Examples

### Basic Uagge

<demo src="./demo/demo1.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set elements that need listen dom.">
</demo>

### Pass in DOM element

<demo src="./demo/demo2.vue"
  language="vue"
  title="Pass in DOM element"
  desc="Pass in a function that returns the DOM element.">
</demo>

## API

```javascript
const isHovering = useHover(target, {
  onEnter,
  onLeave,
});
```

### Params

| Property | Description               | Type                                                  | Default |
| -------- | ------------------------- | ----------------------------------------------------- | ------- |
| target   | DOM element or Ref Object | (() => HTMLElement) \| HTMLElement \| React.RefObject | -       |
| onEnter  | Listen to hover           | ()=>void                                              | -       |
| onLeave  | Listening leave hover     | ()=>void                                              | -       |

### Result

| Property   | Description                                                 | Type    |
| ---------- | ----------------------------------------------------------- | ------- |
| isHovering | Determine whether the mouse element is in the hover element | boolean |
