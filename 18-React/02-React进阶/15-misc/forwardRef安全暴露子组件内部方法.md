[这段代码](../13-Hooks/src/09-useImperativeHandle/02-useImperativeHandle用法.js)是在演示：

> 父组件如何“主动调用”子组件内部的方法。

这里用到：

* `forwardRef`
* `useImperativeHandle`

---

正常情况下：

```jsx id="4y8pn5"
<HYInput ref={inputRef} />
```

ref 会直接拿到：

```txt id="v9h1ei"
子组件最外层 DOM
```

但函数组件默认拿不到 ref。

所以需要：

```js id="6gc4zx"
forwardRef
```

让函数组件支持 ref。

---

这里：

```js id="s2bqii"
const HYInput = forwardRef((props, ref) => {
```

表示：

```txt id="t7odvl"
父组件传进来的 ref
```

可以在子组件里接收到。

---

然后：

```js id="jqm6z4"
const inputRef2 = useRef()
```

这是子组件内部真正绑定 input 的 ref：

```jsx id="vxcbvf"
<input ref={inputRef2} />
```

---

关键是：

```js id="n4ax1q"
useImperativeHandle(ref, () => ({
  focus: () => {
    inputRef2.current.focus()
  }
}))
```

意思：

> 不把整个 input DOM 暴露给父组件，
> 而是“自定义”父组件能访问的内容。

最终父组件拿到的：

```js id="sh4axv"
inputRef.current
```

其实是：

```js id="50dt9q"
{
  focus() { ... }
}
```

而不是 DOM。

---

所以这里：

```js id="88hbgv"
inputRef.current.focus()
```

实际上调用的是：

```js id="pmz8md"
子组件暴露出来的 focus 方法
```

再由它内部：

```js id="p3x2ig"
inputRef2.current.focus()
```

真正让 input 聚焦。

---

简单说：

# 这段代码的目的

让父组件：

```txt id="rk8m5f"
安全地调用子组件内部方法
```

而不是直接操作子组件 DOM。

---

为什么要这样？

因为：

```txt id="d4pxkp"
直接暴露 DOM 不够安全
```

父组件能乱操作：

* value
* style
* className
* remove()

封装性不好。

---

而：

```js id="d9f8xe"
useImperativeHandle
```

可以只暴露：

```txt id="xfjlwm"
你允许外部调用的方法
```

比如：

* focus
* clear
* open
* close

这是 React 推荐方式。




---

* `forwardRef`
  → 让函数组件能够接收 `ref`

* `useImperativeHandle`
  → 自定义 `ref.current` 暴露的内容

---

比如：

```jsx id="o9xwod"
const Child = forwardRef((props, ref) => {
```

这里的作用只是：

```txt id="7c5j2g"
让父组件可以给 Child 传 ref
```

否则函数组件默认不能用 ref。

---

然后：

```js id="8x6m4i"
useImperativeHandle(ref, () => ({
  focus() {}
}))
```

作用是：

```txt id="b9g6wq"
决定父组件最终能拿到什么
```

---

所以：

# 没有 useImperativeHandle

```js id="p3j4xe"
forwardRef
```

通常会这样：

```jsx id="kkmqvt"
<input ref={ref} />
```

父组件拿到的是：

```js id="epu2ml"
input DOM
```

---

# 有了 useImperativeHandle

你可以改成：

```js id="gw3k5k"
ref.current = {
  focus() {}
}
```

父组件只能调用：

```js id="lnq2zx"
ref.current.focus()
```

而不能乱操作 DOM。

---

一句话：

| API                 | 作用          |
| ------------------- | ----------- |
| forwardRef          | 让组件能接收 ref  |
| useImperativeHandle | 控制 ref 暴露什么 |
