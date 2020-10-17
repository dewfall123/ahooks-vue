# useWorkerFunction

一个在 worker 中使用纯函数的 Hook

> 按照 [useWorker](https://github.com/alewin/useWorker) 源码用 Vue 实现的。

## 代码演示

### 基本用法

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="传入一个纯函数，对比使用worker和不使用worker的情况。可以看到在worker排序不影响主线程动画。">
</demo>
