# useKeyPress

一个优雅的管理 keyup 和 keydown 键盘事件的 Hook，支持键盘组合键，定义键盘事件的 key 和 keyCode 别名输入 。

## 代码演示

### 基础用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基础用法"
  desc="支持键盘事件中的 key 和 keyCode，请按 ArrowUp 或 ArrowDown 键进行演示。">
</demo>

### 组合方式

<demo src="./demo/demo2.vue"
  language="vue"
  title="组合方式"
  desc="支持接收一组输入键，或以组合键的方式传递参数.">
</demo>

### 进阶使用

<demo src="./demo/demo3.vue"
  language="vue"
  title="进阶使用"
  desc="支持接收一个返回 boolean 的回调函数，处理预处理操作。">
</demo>

## API

```javascript
useKeyPress(
  keyFilter: KeyFilter,
  eventHandler: EventHandler = noop,
  options?: Options
)
```

### 参数

> Tips: keyType 为键盘事件中的 key 和 keyCode

| 参数         | 说明                                                                         | 类型                                                              | 默认值   |
| ------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| keyFilter    | 支持键盘事件中的 key 和 keyCode，支持回调方式返回 boolean 判断，支持别名使用 | keyType \| Array<keyType\> \| ((event: KeyboardEvent) => boolean) | -        |
| eventHandler | 事件回调函数                                                                 | (event: KeyboardEvent) => void                                    | () => {} |
| options      | 可选配置项，见 Options                                                       | -                                                                 | -        |  |

### Options

| 参数   | 说明                  | 类型                                                         | 默认值      |
| ------ | --------------------- | ------------------------------------------------------------ | ----------- |
| events | 触发事件              | Array<keydown \| keyup\>                                     | ['keydown'] |
| target | DOM 节点或者 Ref 对象 | (() => HTMLElement) \| HTMLElement \| React.MutableRefObject | -           |

## 备注

1.全部的按键别名

```javascript
enter
tab
delete (捕获“删除”和“退格”键)
esc
space
up
down
left
right
```

2.修饰键

```javascript
ctrl;
alt;
shift;
meta;
```
