# useSize

A hook to subscribe DOM element size change

## Examples

### Basic usage

<demo src="./demo/demo1.vue"
  title="Basic usage"
  desc="drag the div. look at the value change">
</demo>

## API

```ts
const size = useSize(target);
```

### Params

| Property | Description               | Type                                                   | Default |
| -------- | ------------------------- | ------------------------------------------------------ | ------- |
| target   | DOM element or Ref Object | HTMLElement \| (() => HTMLElement) \| MutableRefObject | -       |

### Result

| Property | Description     | Type                              |
| -------- | --------------- | --------------------------------- |
| size     | size of the DOM | { width: number, height: number } |
