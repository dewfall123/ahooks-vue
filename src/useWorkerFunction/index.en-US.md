---
map:
  path: /use-worker-function
---

# useWorkerFunction

A hook that exec the function in worker.

::: warning
Implementation is original ported from [useWorker](https://github.com/alewin/useWorker) 。
:::

## Examples

### Basic Usage

<demo src="./demo/demo1.vue"
  language="vue"
  title="Basic usage"
  desc="Click the two button. You can see the function executed in wroker does not affect the main thread animation.">
</demo>

## API

```ts
const { callWokerFn, status, worker, killWorker } = useWorkerFunction(
  fn,
  Options?,
);
```

### Result

| Value      | Type                                                       | Description                                                |
| ---------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| workerFn   | `(...workerArgs: Parameters<T>) => Promise<ReturnType<T>>` | The `function` that allows you to run `fn` with web worker |
| status     | `Ref<WORKER_STATUS>`                                       | The status of `workerFn`                                   |
| killWorker | Function                                                   | The function that allows killing the worker                |
| worker     | `Ref<WorkerWithURL>`                                       | The worker                                                 |

### Params

| Value   | Type     | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| fn      | Function | The `pure function` to run with web workers     |
| options | Object   | The object containing the options of the worker |

### Options

| Value              | Type            | Default   | Description                                                                                                                          |
| ------------------ | --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| timeout            | Number          | undefined | The number of milliseconds before killing the worker                                                                                 |
| remoteDependencies | Array of String | []        | An array that contains the remote dependencies needed to run the worker                                                              |
| autoTerminate      | Boolean         | true      | Kill the worker once it's done (success or error)                                                                                    |
| transferable       | String          | 'auto'    | Enable [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Transferable), to disable it set transferable: 'none' |
