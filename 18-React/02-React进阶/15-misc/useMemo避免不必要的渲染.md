[这段代码](../13-Hooks/src/07-useMemo/01-useMemo复杂计算的应用.js)是在演示：

> `useMemo` 可以缓存计算结果，避免组件重新渲染时重复执行耗时计算。

核心代码：

```js
const total = useMemo(() => {
  return calcNumber(count)
}, [count])
```

意思是：

* 只有 `count` 变化时，才重新执行 `calcNumber`
* 其它状态变化（比如 `show`）时，直接用上次缓存结果

---

如果不用 `useMemo`：

```js
const total = calcNumber(count)
```

那么组件每次 render 都会重新执行：

```js
calcNumber(count)
```

即使：

```js
setShow(!show)
```

这种和计算无关的状态变化，也会重新计算。

---

你现在感觉“没区别”，是因为：

```js
calcNumber
```

计算量太小了。

就算重复执行，也感觉不到性能差异。

如果里面是：

```js
for (let i = 0; i < 1000000000; i++)
```

那不用 `useMemo`，点 `show切换` 就会明显卡顿。

---

一句话总结：

* 不用 `useMemo`
  → 每次 render 都重新计算

* 用了 `useMemo`
  → 依赖没变就直接复用缓存结果，不重复算。
