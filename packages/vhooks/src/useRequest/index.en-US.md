# useRequest

Production-ready Vue Hook to manage asynchronous data.

## Examples

### Basic usage

<demo src="./demo/demo-default.vue"
  language="vue"
  title="Basic usage"
  desc="In this example, useRequest receives an asynchronous function `getUsername`, which is automatically triggered when the component mounted.
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

<demo src="./demo/demo-polling.vue"
  language="vue"
  title="Polling"
  desc="If `options.pollingInterval` is set, Polling can be turned on.">
</demo>

### Debounce

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
