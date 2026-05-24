React 从 React 18 开始，底层渲染架构升级了。

你看到的变化：

```js
ReactDOM.render(...)
```

变成：

```js
const root = ReactDOM.createRoot(...)
root.render(...)
```

本质上不是“API 改名字”这么简单，

而是：

👉 React 从“旧渲染模式（Legacy Root）”
升级到了：
👉 “并发渲染架构（Concurrent Root）”

---

# 一、旧写法的问题

以前：

```js id="by9owd"
ReactDOM.render(<App />, rootElement)
```

内部实际上是：

```text id="11qf5m"
Legacy Root（旧同步渲染模式）
```

特点：

* 同步渲染
* 一旦开始 render，就必须一口气执行到底
* React 很难“中断”渲染

---

## 这会导致什么问题？

如果页面复杂：

```text id="c7m10j"
render 10,000 个组件
```

React 会：

```text id="puh1nt"
一直执行到底
```

期间：

* 用户点击
* 动画
* 输入框

可能卡顿。

---

# 二、React 18 想解决什么？

React 团队想实现：

## 🚀 Concurrent Rendering（并发渲染）

核心思想：

👉 React 渲染可以：

* 暂停
* 中断
* 恢复
* 分优先级

类似：

```text id="c17ck2"
低优先级任务：
渲染大列表

高优先级任务：
用户输入
```

React 可以：

```text id="h1kzsh"
先响应用户输入
再继续渲染列表
```

---

# 三、于是 React 引入了“Root 对象”

以前：

```js id="pwmh1z"
ReactDOM.render(app, el)
```

太简单了。

React 没地方保存：

* 调度器状态
* 并发配置
* hydration 状态
* future features

---

## 所以现在：

```js id="vqkp7f"
const root = ReactDOM.createRoot(el)
```

变成：

```text id="jlwmg7"
创建一个“渲染根实例”
```

这个 root 对象：

👉 内部保存整个 Fiber Root 的状态。

---

# 四、新 API 本质上是什么？

## createRoot

```js id="d7a9fx"
const root = ReactDOM.createRoot(el)
```

意思：

```text id="76t7l1"
创建 Concurrent Root
```

---

## root.render

```js id="mc45wn"
root.render(<App />)
```

意思：

```text id="e93kgk"
开始调度 React 渲染
```

---

# 五、为什么不能直接升级旧 render？

因为：

```js id="4r8ifc"
ReactDOM.render()
```

默认行为是：

```text id="bjr1qo"
Legacy Mode
```

React 团队不想：

* 升级 React 后老项目行为突然变化
* 导致兼容性问题

所以：

👉 必须显式调用：

```js id="ttv71v"
createRoot()
```

才进入新架构。

---

# 六、createRoot 开启了哪些新能力？

---

## 1️⃣ Automatic Batching（自动批处理）

以前：

```js id="lyx6ci"
setTimeout(() => {
  setA(1)
  setB(2)
})
```

会 render 两次。

React 18：

👉 自动合并。

---

## 2️⃣ Concurrent Rendering

React 可以：

* 中断 render
* 分优先级
* 时间切片

---

## 3️⃣ startTransition

```js id="e6f9ea"
startTransition(() => {
  setList(newList)
})
```

低优先级更新。

---

## 4️⃣ Suspense 更强

支持：

* streaming
* async rendering

---

# 七、StrictMode 为什么 React 18 会“执行两次”？

很多人升级后发现：

```js id="dgr5ji"
useEffect(() => {})
```

执行两次。

原因是：

```text id="6dkj9o"
React 18 StrictMode
会故意模拟 mount/unmount
```

为了检测：

* 副作用是否安全
* 并发模式是否兼容

这是 Concurrent Mode 的准备工作。

---

# 八、底层一点（Fiber Root）

实际上：

```js id="jlwmwo"
createRoot(container)
```

内部会创建：

```text id="a5ov7z"
FiberRootNode
```

React 以后所有调度：

* lanes
* priority
* scheduler

都挂在 root 上。

---

# 九、一句话总结

你可以这样理解：

---

## React 17 以前

```text id="d4s52c"
ReactDOM.render
= 旧同步渲染入口
```

---

## React 18 以后

```text id="5p9m6x"
createRoot
= 创建新的并发渲染根（Concurrent Root）
```

所以 API 改变的真正原因是：

> React 18 引入了新的并发渲染架构，需要通过 createRoot 创建新的渲染根对象，以支持调度、优先级、中断渲染等能力，而旧的 ReactDOM.render 无法承载这些新特性。
