# useKeyPress

A hook that elegantly manages KeyboardEvent of keyup adn keydown, Keyboard key combinations are supported to define key and keyCode alias input for keyboard events.

## Examples

### Basic usage

<demo src="./demo/demo1.vue"
  language="vue"
  title="Basic usage"
  desc="Support using key aliases. Please refer to the document below.">
</demo>

### Compound mode

<demo src="./demo/demo2.vue"
  language="vue"
  title="Compound mode"
  desc="Support for receiving a set of input keys or passing parameters as a combination of keys. Attention：Key combination only supports the use of modified key + key alias + key in keyboard events.">
</demo>

### Advanced

<demo src="./demo/demo3.vue"
  language="vue"
  title="Advanced"
  desc="Supports receiving a Boolean callback function to handle preprocessing operations.">
</demo>

## API

```javascript
useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  options?: Options
)
```

### Params

> Tips: keyType is the key or keyCode of KeyboardEvent.

| Property     | Description                                                                              | Type                                                              | Default  |
| ------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| keyFilter    | Support for key and keyCode in keyboard events,function that return Boolean, key aliases | keyType \| Array<keyType\> \| ((event: KeyboardEvent) => boolean) | -        |
| eventHandler | Callback Function                                                                        | (event: KeyboardEvent) => void                                    | () => {} |
| options      | advanced options，see Options below                                                      | -                                                                 | -        |  |

### Options

| Property | Description               | Type                                                         | Default     |
| -------- | ------------------------- | ------------------------------------------------------------ | ----------- |
| events   | Trigger Events            | Array<keydown \| keyup\>                                     | ['keydown'] |
| target   | DOM element or Ref Object | (() => HTMLElement) \| HTMLElement \| React.MutableRefObject | -           |

## Remarks

1.All key aliases

```javascript
enter;
tab;
delete ('Backspace', 'Delete');
esc;
space;
up;
down;
left;
right;
```

2.Modifier keys

```javascript
ctrl;
alt;
shift;
meta;
```
