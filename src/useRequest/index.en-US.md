---
map:
  path: /use-request
---

# useRequest

Production-ready Vue Hook to manage asynchronous data.

::: warning
The API is different from [ahooks](https://ahooks.js.org/hooks/async).
:::

## Examples

### Basic usage

<demo src="./demo/demo-default.vue"
  language="vue"
  title="Basic usage"
  desc="In this example, useRequest receives an asynchronous function `getFullName`, which is automatically triggered when the component mounted.
  At the same time, useRequest will automatically manage the status of `loading`, `data`, and `error` of asynchronous requests.">
</demo>

### Manual trigger

<demo src="./demo/demo-manual.vue"
  language="vue"
  title="Manual trigger"
  desc="If `options.manual` is set, the async function will only be executed when the `run` function is called.">
</demo>

### Polling

- You can set `options.pollingWhenHidden=false` to temporarily suspend the scheduled task when the screen is not visible.
- Use `run` / `cancel` to start / stop polling.
- When `options.manual=true`, you need to call the `run` function to start the polling
- When `options.pollingSinceLastFinished=false`, request will start every `pollingInterval` time, not waitting last request finished.

<demo src="./demo/demo-polling.vue"
  language="vue"
  title="Polling"
  desc="If `options.pollingInterval` is set, Polling can be turned on.">
</demo>

### Debounce

- When `options.loadingWhenDebounceStart=false`, loading will not be `true` immediately, wait until the function actually executes.

<demo src="./demo/demo-debounce.vue"
  language="vue"
  title="Debounce"
  desc="If `options.debounceInterval` is set, requests except for the last one within the debounce interval will be dropped.">
</demo>

### Throttle

<demo src="./demo/demo-throttle.vue"
  language="vue"
  title="Debounce"
  desc="If `options.throttleInterval` is set, the request will be triggered once maximum within the throttle interval.">
</demo>

### Loading Delay

<demo src="./demo/demo-loading-delay.vue"
  language="vue"
  title="Loading Delay"
  desc="Setting `options.loadingDelay` can specifies a delay in milliseconds for loading (prevent flush).">
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
  refreshDeps, // v0.9
  refreshOnWindowFocus, // v0.9
});
```

### Result

| Property          | Description                                                                                                                                                                         | Type                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| data              | <ul><li> Data returned by the service。</li><li> If `formatResult` is set, the data will be the return of `formatResult`. </li></ul>                                                | `undefined / any`             |
| error             | exception thrown by service, default is `undefined`                                                                                                                                 | `undefined / Error`           |
| loading           | Whether the service is loaded                                                                                                                                                       | `boolean`                     |
| run               | <ul><li>Manually trigger the service execution. Its parameters will be passed to the service function. </li><li>In Debounce or Throttle mode, will return `Promise<null>`</li></ul> | `(...args: any[]) => Promise` |
| params            | An array of parameters for the service being executed. For example, you triggered `run (1, 2, 3)`, then params is equal to [[1, 2, 3]                                               | `any[]`                       |
| lastSuccessParams | Assigned onlt when last service success                                                                                                                                             | `any[]`                       |
| cancel            | <ul><li>Cancel the current running request </li><li>This will also stop the polling. </li></ul>                                                                                     | `() => void`                  |
| refresh           | Using the last params, re-execute the service                                                                                                                                       | `() => Promise`               |

### Params

All Options are optional.

| Property                    | Description                                                                                                                                                                                                                                                                    | Type                                    | Default |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------- |
| manual                      | <ul><li> The default `false`. That is, the service is automatically executed during initialization.</li><li>If set to `true`, you need to call `run` manually to trigger execution. </li></ul>                                                                                 | `boolean`                               | false   |
| initialData                 | initial data                                                                                                                                                                                                                                                                   | `any`                                   | -       |
| formatResult                | Format request results                                                                                                                                                                                                                                                         | `(response: any) => any`                | -       |
| onSuccess                   | <ul><li> Triggered when the service resolved, the parameters are `data` and`params` </li><li> If `formatResult` is present,`data` is the formatted data.</li></ul>                                                                                                             | `(data: any, params: any[]) => void`    | -       |
| onError                     | Triggered when the service reports an error. The parameters are `error` and`params`.                                                                                                                                                                                           | `(error: Error, params: any[]) => void` | -       |
| defaultParams               | If `manual = false`, the default parameters when run is executed automatically,                                                                                                                                                                                                | `any[]`                                 | -       |
| loadingDelay                | Set delay time for display loading to avoid flicker                                                                                                                                                                                                                            | `number`                                | -       |
| pollingInterval             | Polling interval in milliseconds. After setting, it will enter polling mode and trigger `run` periodically.                                                                                                                                                                    | `number`                                | -       |
| pollingSinceLastFinished    | <ul><li> Whether start next polling request since last request finished. Default is `true`. </li><li> If set `false`, request will start every `pollingInterval` time. </li></ul>                                                                                              | `boolean`                               | true    |
| pollingWhenHidden           | <ul><li> Whether to continue polling when the page is hidden. Default is `true`, that is, polling will not stop </li><li> If set to `false`, polling is temporarily stopped when the page is hidden, and the last polling is continued when the page is redisplayed </li></ul> | `boolean`                               | `true`  |
| debounceInterval            | debounce interval, the unit is millisecond. After setting, request to enter debounce mode.                                                                                                                                                                                     | `number`                                | -       |
| loadingWhenDebounceStart    | Whether set loading to `true` when the `run` function starts to execute.                                                                                                                                                                                                       | `boolean`                               | `true`  |
| throttleInterval            | throttle interval, the unit is millisecond. After setting, request to enter throttle mode.                                                                                                                                                                                     | `number`                                | -       |
| throwOnError                | If the service errors, the error will only be logged. If you want an error to be thrown, pass the throwOnError: true                                                                                                                                                           | `boolean`                               | `false` |
| refreshOnWindowFocus `v0.9` | The request will be re-initiated when the screen is refocused or revisible.                                                                                                                                                                                                    | `boolean`                               | `false` |
| refreshDeps `v0.9`          | RefreshDeps changes will trigger the service to re-execute.                                                                                                                                                                                                                    | `WatchSource[]`                         | `[]`    |
