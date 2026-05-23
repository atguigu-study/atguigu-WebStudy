这是个非常好的问题，因为它涉及到 React 的一个核心设计哲学：

👉 **“默认正确” 比 “默认优化” 更重要。**

虽然 `PureComponent` 可以减少不必要渲染，但它并不是“永远更好”，甚至可能带来：

* bug
* 难以发现的问题
* 错误的优化

所以 React 默认仍然是：

```js id="m0nmwz"
class MyComponent extends React.Component
```

而不是：

```js id="k3j9zn"
class MyComponent extends React.PureComponent
```

---

# 一、先理解 PureComponent 到底做了什么

---

## 普通 Component

每次父组件 render：

```text id="i3w7ej"
子组件默认也 render
```

React 不会帮你比较 props/state。

---

## PureComponent

会自动做：

```js id="g2m8xp"
shouldComponentUpdate(nextProps, nextState)
```

内部类似：

```js id="ft1e5w"
shallowEqual(oldProps, newProps)
shallowEqual(oldState, newState)
```

如果浅比较发现没变化：

👉 跳过 render。

---

# 二、为什么这不是默认行为？

因为：

👉 “浅比较” 本身是有风险假设的。

---

# 三、最大的原因：React 默认假设 state 可能被“可变修改”

---

## 例子

```js id="31m2dj"
this.state = {
  user: {
    name: "Tom"
  }
}
```

你错误地这样改：

```js id="9b9dmu"
this.state.user.name = "Jack";
```

对象引用没变：

```text id="vdv1fh"
oldUser === newUser
```

---

## PureComponent 会发生什么？

浅比较：

```js id="kjlwmq"
oldProps.user === newProps.user
```

结果：

```text id="yxprg5"
true
```

于是：

👉 React 认为没变化
👉 不 render
👉 UI 不更新

---

# 四、这就是为什么 PureComponent 容易“出隐蔽 bug”

它依赖一个前提：

```text id="8k8c5r"
你必须永远保持 immutable（不可变更新）
```

比如：

✅ 正确：

```js id="z8k72t"
setState({
  user: {
    ...user,
    name: "Jack"
  }
})
```

❌ 错误：

```js id="5rppht"
user.name = "Jack"
```

---

# 五、React 不想默认强制这种心智负担

React 的设计理念：

👉 默认应该：

* 简单
* 不容易错
* predictable

而不是：

```text id="9u6azd"
“默认很快，但容易 silently broken”
```

---

# 六、还有一个重要原因：浅比较也有成本

很多人误以为：

```text id="yk26ha"
PureComponent = 免费优化
```

其实不是。

---

## PureComponent 每次都要：

```text id="30q35v"
遍历 props/state 做 shallow compare
```

如果：

* props 很多
* 对象层级复杂

比较本身也耗性能。

---

## 有时候：

```text id="g4w0li"
直接 render
```

反而更便宜。

因为 React render 并不一定真的操作 DOM。

---

# 七、React 的哲学：render 很便宜

React Fiber 之后：

👉 render 阶段只是：

```text id="u54gnv"
生成 Virtual DOM
```

真正 expensive 的是：

```text id="t7m19f"
DOM commit
```

所以 React 更倾向：

```text id="q3u0za"
默认先 render
必要时再优化
```

而不是：

```text id="r9d3iq"
默认到处做比较
```

---

# 八、为什么现在更少提 PureComponent 了？

因为 Function Component 成主流后：

---

## 类组件时代

```js id="m8rq9y"
PureComponent
```

---

## 函数组件时代

对应的是：

```js id="fd3v6i"
React.memo()
```

```js id="q7r4g7"
export default React.memo(MyComponent)
```

原理类似：

👉 浅比较 props。

---

# 九、现代 React 的思路已经变了

现在 React 官方越来越强调：

👉 不要“过度 memoization”

因为：

* 维护成本
* 心智负担
* stale closure
* dependency bug

很多时候：

```text id="dwmn9d"
memo/useMemo/useCallback
```

反而让代码更复杂。

---

# 十、一句话总结

你可以这样理解：

> PureComponent 能通过浅比较减少不必要 render，但它依赖不可变数据（immutable update）这一前提。如果默认使用，很多开发者在直接修改对象时会导致组件不更新，产生隐蔽 bug。
> 同时浅比较本身也有性能成本，所以 React 选择默认使用更安全、更简单的 Component，把 PureComponent 作为“显式优化手段”交给开发者决定是否使用。
