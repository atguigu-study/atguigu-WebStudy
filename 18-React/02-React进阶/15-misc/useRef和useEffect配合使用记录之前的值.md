[这段代码](../13-Hooks/src/08-useRef/02-useRef引用其他数据.js)确实是很多人第一次学 `useRef` 时最容易绕晕的地方。

核心原因是：

👉 `render`
👉 `useEffect`
👉 `ref`
👉 state 更新

它们发生在**不同阶段**。

你这段代码其实是在实现：

```text id="knn0xz"
“记录上一次的 count”
```

这是 `useRef` 的经典用法。

---

# 一、先记住最核心的一句话

```js id="oj01bm"
useEffect 是 render 完之后才执行
```

所以：

```text id="v3blx7"
render 时看到的是“旧 ref”
effect 才会把 ref 更新成新值
```

于是：

```text id="u74f6g"
ref.current
自然就成了“上一次的值”
```

---

# 二、你代码里的关键逻辑

---

## 1️⃣ state

```js id="h8hhks"
const [count, setCount] = useState(0)
```

当前值。

---

## 2️⃣ ref

```js id="z0eygx"
const numRef = useRef(count)
```

重点：

👉 `useRef` 返回的是：

```js id="jlwmrp"
{
  current: xxx
}
```

这个对象：

```text id="x9c3n6"
整个组件生命周期内都不会变
```

React 会帮你保存。

---

# 三、很多人误解的一点（非常重要）

你写：

```js id="cl1vpo"
console.log("新的ref创建了")
```

看起来像：

```text id="44mvsq"
每次 render 都重新创建 ref
```

其实不是。

---

## 真正发生的是：

第一次 render：

```js id="yu89wp"
useRef(0)
```

React 内部：

```js id="mpkhlz"
{ current: 0 }
```

保存起来。

---

以后 render：

```js id="0e8k9z"
useRef(count)
```

React 会：

```text id="o7zqko"
忽略参数
直接返回之前那个 ref 对象
```

所以：

```text id="vjjlwm"
ref identity 永远不变
```

---

# 四、完整执行顺序（最重要）

---

# 第一次 render

---

## Step 1 render 开始

```js id="blg76t"
count = 0
```

---

## Step 2 useRef

```js id="w3a0nd"
numRef.current = 0
```

---

## Step 3 JSX 渲染

```jsx id="u7wp6f"
count上一次的值: 0
count这一次的值: 0
```

因为：

```text id="qen1ps"
ref.current 还是 0
count 也是 0
```

---

## Step 4 render 完成后

执行 effect：

```js id="fw5k7n"
numRef.current = count
```

即：

```js id="7xvjqg"
numRef.current = 0
```

没变化。

---

# 五、点击按钮后

---

## 点击

```js id="c2grll"
setCount(count + 10)
```

变成：

```text id="o3rx7e"
count = 10
```

React 重新 render。

---

# 六、第二次 render（关键）

---

## Step 1 render 开始

```js id="m6r9c5"
count = 10
```

---

## Step 2 useRef

注意：

```js id="ulwd4j"
useRef(count)
```

不会重新创建。

React 返回：

```js id="yx6e2i"
{ current: 0 }
```

还是之前那个对象。

---

## Step 3 JSX 渲染

此时：

```js id="4v1z4v"
numRef.current === 0
count === 10
```

所以页面：

```text id="4x7jsk"
上一次: 0
这一次: 10
```

这就是关键。

---

## Step 4 render 完成后

effect 执行：

```js id="kvr4mf"
numRef.current = count
```

即：

```js id="f2ah0d"
numRef.current = 10
```

---

# 七、下一次点击

再次 render：

```text id="ljlwm3"
ref.current = 10
count = 20
```

页面：

```text id="4kqmkj"
上一次: 10
这一次: 20
```

---

# 八、所以这个技巧的本质是

```text id="8d2xqo"
render 时：
看到的是 effect 更新之前的 ref
```

而：

```text id="pqjlwm"
effect 总是在 render 之后执行
```

于是：

```text id="r1vfej"
ref.current 永远落后一个 render
```

这就自然变成：

👉 “上一次的值”。

---

# 九、用时间线理解（最清晰）

---

## 初始

```text id="bnfxxk"
count = 0
ref = 0
```

---

## 点击后 render

render 时：

```text id="nyl72d"
count = 10
ref = 0
```

页面显示：

```text id="l8jlwm"
previous: 0
current: 10
```

---

## render 完成后

effect：

```text id="5du9w1"
ref = 10
```

---

## 下一次 render

```text id="jlwmjv"
count = 20
ref = 10
```

---

# 十、一句话总结

这段代码的核心机制是：

> useRef 保存的是同一个 ref 对象，而 useEffect 会在 render 完成后才更新 ref.current。
> 因此下一次 render 时，ref.current 里保存的还是“上一次 render 的值”，从而实现记录 previous state 的效果。
