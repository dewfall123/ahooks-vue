---
map:
  path: /use-worker-function
---

# useWorkerFunction

一个在 worker 中使用纯函数的 Hook

::: warning
参照 [useWorker](https://github.com/alewin/useWorker) 源码用 Vue 实现的。
:::

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="传入一个纯函数，对比使用worker和不使用worker的情况。可以看到在worker排序不影响主线程动画。">
</demo>

## API

```ts
const { callWokerFn, status, worker, killWorker } = useWorkerFunction(
  fn,
  Options?,
);
```

### Result

| 参数       | 类型                                                       | 说明                     |
| ---------- | ---------------------------------------------------------- | ------------------------ |
| workerFn   | `(...workerArgs: Parameters<T>) => Promise<ReturnType<T>>` | 触发执行`fn`的函数       |
| status     | `Ref<WORKER_STATUS>`                                       | 函数`workerFn`的执行状态 |
| killWorker | Function                                                   | 通过这个函数 kill worker |
| worker     | `Ref<WorkerWithURL>`                                       | worker 引用              |

### Params

| 参数    | 类型     | 说明                        |
| ------- | -------- | --------------------------- |
| fn      | Function | 传入在 woker 中执行的纯函数 |
| options | Object   | 可选参数                    |

### Options

| 参数               | 类型            | 默认值    | 说明                                                                                                                              |
| ------------------ | --------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| timeout            | Number          | undefined | 设置超时时间，在传入时间内未执行完，会 kill woker                                                                                 |
| remoteDependencies | Array of String | []        | 设置 woker 运行需要的远程依赖                                                                                                     |
| autoTerminate      | Boolean         | true      | `fn`执行结束后 kill woker(不管成功或失败)                                                                                         |
| transferable       | String          | 'auto'    | 开启 [Transferable Objects](https://developer.mozilla.org/en-US/docs/Web/API/Transferable), 需要关闭可以设置 transferable: 'none' |
