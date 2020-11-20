---
map:
  path: /hooks/use-request
---

# useRequest

一个管理异步数据请求的 Hook.

::: warning
API 有改动，见[ahooks](https://ahooks.js.org/hooks/async)。
:::

## 代码演示

### 基础用法

<demo src="./demo/demo-default.vue"
  language="vue"
  title="基础用法"
  desc="在这个例子中， useRequest 接收了一个异步函数 `getFullName` ，在组件初次加载时， 自动触发该函数执行。同时 useRequest 会自动管理异步请求的 `loading` , `data` , `error` 等状态。">
</demo>

### 手动执行

<demo src="./demo/demo-manual.vue"
  language="vue"
  title="手动执行"
  desc="通过设置 `options.manual = true` , 则需要手动调用 `run` 时才会触发执行异步函数。">
</demo>

### 轮询

- 通过设置 `options.pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。
- 通过 `run` / `cancel` 来 开启/停止 轮询。
- 在 `options.manual=true` 时，需要第一次执行 `run` 后，才开始轮询。
- 在 `options.pollingSinceLastFinished=false`时，每隔`pollingInterval`ms 都会执行一次请求，而不是等上次请求结束。

<demo src="./demo/demo-polling.vue"
  language="vue"
  title="轮询"
  desc="通过设置 `options.pollingInterval` ，进入轮询模式，定时触发函数执行。">
</demo>

### 防抖 Debounce

- 在`options.loadingWhenDebounceStart=false`，loading 不会在第一时间变成`true`，要等到`debounceInterval`ms 后，即函数真正执行时。

<demo src="./demo/demo-debounce.vue"
  language="vue"
  title="防抖 Debounce"
  desc="通过设置 `options.debounceInterval` ，则进入防抖模式。此时如果频繁触发 `run` ，则会以防抖策略进行请求。">
</demo>

### 节流 Throttle

<demo src="./demo/demo-throttle.vue"
  language="vue"
  title="节流 Throttle"
  desc="通过设置 `options.throttleInterval` ，则进入节流模式。此时如果频繁触发 `run` ，则会以节流策略进行请求。">
</demo>

### Loading Delay

<demo src="./demo/demo-loading-delay.vue"
  language="vue"
  title="Loading Delay"
  desc="通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。">
</demo>

## Basic API

```javascript
const {
  data,
  error,
  loading,
  run,
  params,
  cancel,
  refresh,
  fetches,
  lastSuccessParams,
} = useRequest(service, {
  formatResult,
  manual,
  onSuccess,
  onError,
  defaultLoading,
  loadingDelay,
  defaultParams,
  pollingInterval,
  pollingWhenHidden,
  pollingSinceLastFinished,
  refreshOnWindowFocus,
  focusTimespan,
  debounceInterval,
  loadingWhenDebounceStart,
  throttleInterval,
  initialData,
  requestMethod,
  ready,
  throwOnError,
});
```

### Result

| 参数              | 说明                                                                                                                        | 类型                          |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| data              | <ul><li> service 返回的数据，默认为 `undefined`。</li><li> 如果有 `formatResult`, 则该数据为被格式化后的数据。</li></ul>    | `undefined / any`             |
| error             | service 抛出的异常，默认为 `undefined`                                                                                      | `undefined / Error`           |
| loading           | service 是否正在执行                                                                                                        | `boolean`                     |
| run               | <ul><li>手动触发 service 执行，参数会传递给 service</li><li>debounce 模式与 throttle 模式返回值为 `Promise<null>`</li></ul> | `(...args: any[]) => Promise` |
| params            | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]`                                      | `any[]`                       |
| lastSuccessParams | 和`params`类似，但是只有成功执行才赋值。                                                                                    | `any[]`                       |
| cancel            | <ul><li>取消当前请求 </li><li>如果有轮询，停止 </li></ul>                                                                   | `() => void`                  |
| refresh           | 使用上一次的 params，重新执行 service                                                                                       | `() => Promise`               |

### Params

所有的 Options 均是可选的。

| 参数                     | 说明                                                                                                                                                                                              | 类型                                    | 默认值  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------- |
| manual                   | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 触发执行。 </li></ul>                                                                      | `boolean`                               | false   |
| initialData              | 默认的 data                                                                                                                                                                                       | `any`                                   | -       |
| formatResult             | 格式化请求结果                                                                                                                                                                                    | `(response: any) => any`                | -       |
| onSuccess                | <ul><li> service resolve 时触发，参数为 `data` 和 `params` </li><li> 如果有 `formatResult` ，则 `data` 为格式化后数据。</li></ul>                                                                 | `(data: any, params: any[]) => void`    | -       |
| onError                  | service 报错时触发，参数为 `error` 和 `params`。                                                                                                                                                  | `(error: Error, params: any[]) => void` | -       |
| defaultParams            | 如果 `manual=false` ，自动执行 `run` 的时候，默认带上的参数                                                                                                                                       | `any[]`                                 | -       |
| loadingDelay             | 设置显示 loading 的延迟时间，避免闪烁                                                                                                                                                             | `number`                                | -       |
| pollingInterval          | 轮询间隔，单位为毫秒。设置后，将进入轮询模式，定时触发 `run`                                                                                                                                      | `number`                                | -       |
| pollingSinceLastFinished | <ul><li> 轮询开始的时间，默认是 `true`，即等到上次请求结束，再经过`pollingInterval`ms 才开始执行 </li><li> 如果设置为 `false` , 会每隔`pollingInterval`开始执行，不管上次请求结束时间。</li></ul> | `boolean`                               | `true`  |
| pollingWhenHidden        | <ul><li> 在页面隐藏时，是否继续轮询。默认为 `true`，即不会停止轮询 </li><li> 如果设置为 `false` , 在页面隐藏时会暂时停止轮询，页面重新显示时继续上次轮询 </li></ul>                               | `boolean`                               | `true`  |
| refreshOnWindowFocus     | <ul><li> 在屏幕重新获取焦点或重新显示时，是否重新发起请求。默认为 `false`，即不会重新发起请求。 </li><li>如果设置为 `true`，在屏幕重新聚焦或重新显示时，会重新发起请求。</li></ul>                | `boolean`                               | `false` |
| debounceInterval         | 防抖间隔, 单位为毫秒，设置后，请求进入防抖模式。                                                                                                                                                  | `number`                                | -       |
| loadingWhenDebounceStart | 是否在 debounce 过的`run`函数执行的第一时间将 loading 置为`true`                                                                                                                                  | `boolean`                               | `true`  |
| throttleInterval         | 节流间隔, 单位为毫秒，设置后，请求进入节流模式。                                                                                                                                                  | `number`                                | -       |
| throwOnError             | 如果 service 报错，我们会帮你捕获并打印日志，如果你需要自己处理异常，可以设置 throwOnError 为 true                                                                                                | `boolean`                               | `false` |
