# React进阶知识学习

将子文件夹中代码复制到根目录的src文件夹内即可运行 `npm run dev`，具体笔记在相关子文件夹  
[尚硅谷React教程](https://www.bilibili.com/video/BV1wy4y1D7JT/)  
[尚硅谷】2021 React全家桶【React17】](https://www.youtube.com/playlist?list=PLmOn9nNkQxJFJXLvkNsGsoCUxJLqyLGxu)

---
- [01-create react app脚手架文件](#01-create-react-app脚手架文件)
- [02-React路由的基本使用](#02-react路由的基本使用)
- [03-NavLink与封装NavLink](#03-navlink与封装navlink)
- [04-嵌套路由](#04-嵌套路由)
- [05-路由参数（params）](#05-路由参数params)
- [06-路由参数（search）](#06-路由参数search)
- [07-路由参数（state）](#07-路由参数state)
- [08-编程式路由导航](#08-编程式路由导航)
- [09-Redux精简版计算案例](#09-redux精简版计算案例)
- [10-Redux完整版计算案例](#10-redux完整版计算案例)
- [11-Redux异步action](#11-redux异步action)
- [12-react-redux基础使用](#12-react-redux基础使用)
- [13-融合UI组件与容器组件](#13-融合ui组件与容器组件)
- [14-react-redux多组件数据共享](#14-react-redux多组件数据共享)
- [15-setState的使用](#15-setstate的使用)
- [16-lazyload的使用](#16-lazyload的使用)
- [17-useState](#17-usestate)
- [18-useEffect](#18-useeffect)
- [19-useRef](#19-useref)
- [20-Fragment](#20-fragment)
- [21-性能优化](#21-性能优化)
- [22-Context](#22-context)
- [23-高阶组件(Higher-Order Component)](#23-高阶组件higher-order-component)
- [24-自定义slot](#24-自定义slot)
- [25-组件间通信方式](#25-组件间通信方式)
---

## 01-create react app脚手架文件

---


## [02-React路由的基本使用](/14-Router/01-一级路由/App.jsx)

### 用法
- 明确好页面中的导航区，展示区
- `<App>` 的最外侧包裹了一个 `<BrowserRouter>` 或者 `<HashRouter>`
  ```jsx
  ReactDOM.createRoot(document.getElementById('root'))
    .render(<React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>)
  ```
- 导航区的 `a` 标签改为 `Link` 或者 `NavLink` 标签
  ```jsx
  <Link to="/about">About</Link>
  ```
- 展示区写 `Route` 标签进行路径的匹配，外层用 `<Routes>` 包裹 ~~（ReactRouter6 版本中 `Switch` 已被废弃）~~
  ```jsx
  <Routes>
    <Route path="/about" element={<About />} />
  </Routes>
  ```
- `<Navigate>` 可以实现路由的重定向, ~~(ReactRouter6 版本中已删除 `Redirect`)~~
  ```jsx
  <Route path="/" element={<Navigate to="/home" />}></Route>
  ```

### 注意事项
- 如果2个 `Route` 的路径是一样的，那么只会匹配到第一个 `Route`
- 默认使用的是模糊匹配（输入的路径必须包含匹配的路径，且顺序要一致），开启严格匹配用 `exact`，严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由  
- 多级路径刷新页面，导致页面样式丢失的问题：
  1. `public/index.html` 中引入样式时，写 `/` 不写 `./`  
  2. `public/index.html` 中引入脚本时，写 `%PUBLIC_URL%`（仅限react脚手架项目） 不写 `/`
  3. 使用 `<HashRouter>`
- `<BrowserRouter>` 和 `<HashRouter>` 的区别
  1. 底层原理不一样：
   - `<BrowserRouter>` 用的是H5的 `history` API，不兼容 IE9 及以下版本
   - `<HashRouter>` 用的是 URL 的 hash 值，兼容 IE9 及以下版本
  2. path 表现形式不一样
   - `<BrowserRouter>` 中的 path 为 `/` 开头，例如：localhost:3000/demo/test，请求会发给服务器
   - `<HashRouter>` 中的 path 为 `#` 开头，例如：localhost:3000/#/demo/test，请求 **不会** 发给服务器
  3. 刷新后对路由 `state` 参数的影响
   - `<BrowserRouter>` 没有任何影响，因为 `state` 保存再 `history` 对象中
   - `<HashRouter>` 刷新后会导致路由 `state` 参数丢失

---


## [03-NavLink与封装NavLink](/14-Router/01-一级路由/components/MyNavLink/index.jsx)

### 用法
- `replace` 属性可以实现路由跳转后不留下历史记录，把默认的 push 模式替换成 replace
- `NavLink` 可以实现路由链接的高亮，~~通过 `activeClassName` 指定样式名（ReactRouter6 版本中已删除）~~
- 标签体内容是一个特殊的标签属性 `children`，通过 `this.props.children` 可以获取标签体内容
- `{...props}` 可以将封装后的 `MyNavLink` 的属性 `to` 传递给 `<NavLink>`，包括标签体内容 `children`
  ```jsx
  {/* 封装后的NavLink */}
  <MyNavLink to="/test">Test</MyNavLink>

  {/* 通过 ...props 将属性 to 和标签体内容 children 传递给 NavLink */}
  <NavLink className="list-group-item" {...this.props}></NavLink>
  ```

---


## [04-嵌套路由](/14-Router/02-嵌套路由/router/router.jsx)

### 用法
- 在路由配置中通过 `children` 字段定义子路由
- 子路由的 `path` 不以 `/` 开头，子路由路径会自动拼接到父路由后面。
- 可以使用 `index: true` 指定默认子路由（当访问父路径时显示的默认页面）。
- 父路由组件中使用 `<Outlet />` 指定子路由渲染位置。
- 可在路由配置中使用 `<Navigate>` 做重定向，或在父路由中设置子路由默认项。
- 在 `NavLink` 或 `Link` 中，链接地址应与子路由路径保持一致（例如 `/home/news`）。

[路由配置：](/14-Router/02-嵌套路由/router/router.jsx)
```jsx
const routes = [
  { path: '/', element: <Navigate to="about" /> },
  {
    path: '/home',
    element: <Home />,
    children: [
      { index: true, element: <News /> },
      { path: 'news', element: <News /> },
      { path: 'message', element: <Message /> }
    ]
  },
  { path: '/about', element: <About /> }
]
```

[useRoutes():](/14-Router/02-嵌套路由/App.jsx)
```jsx
import { useRoutes } from 'react-router-dom'

const element = useRoutes(routes)

<div>{element}</div>
```

[父组件中的占位符 `<Outlet />`：](/14-Router/02-嵌套路由/pages/Home.jsx)
```jsx
function Home() {
  return (
    <div>
      <NavLink to="/home/news">News</NavLink>
      <NavLink to="/home/message">Message</NavLink>
      <Outlet /> {/* 子路由渲染在这里 */}
    </div>
  )
}
```

或者直接使用 `<Route>` 嵌套：
```jsx
<Routes>
  <Route path="/home" element={<Home />}>
    <Route path="news" element={<News />} />
    <Route path="message" element={<Message />} />
  </Route>
  <Route path="/about" element={<About />} />
</Routes>
```

---

## 05-路由参数（params）

### 用法
- params 参数通过 URL 片段传递，路由注册中使用 `:id` 之类的占位符。
- 路由链接写法示例：`to={`detail/${item.id}`}`。
- 在接收组件中用 `useParams()` 获取参数。

[路由注册：](/14-Router/03-params参数/router/router.jsx)
```jsx
{
  path: 'message',
  element: <Message />,
  children: [
    { path: 'detail/:id', element: <Detail /> }
  ]
}
```

[路由链接](/14-Router/03-params参数/pages/Message.jsx)
```jsx
<Link to={`detail/${item.id}`}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

[接收参数：](/14-Router/03-params参数/pages/Detail.jsx)
```jsx
import { useParams } from 'react-router-dom'

const { id, title, content } = useParams()
```

### 注意事项
- params 直接写在路径中
- 接收参数时要与路由配置里的变量名一致。如果参数可能不存在，接收组件需要做容错处理。

---

## 06-路由参数（search）

### 用法
- search 参数通过 URL 查询字符串传递，路由注册中只需定义目标路径，不需要 `:key` 占位符。
- 路由注册中只需定义目标路径，不需要 `:key` 占位符。
- 在接收组件中用 `useSearchParams()` 获取参数。

[路由注册：](/14-Router/04-search参数/router/router.jsx)
```jsx
{
  path: 'message',
  element: <Message />,
  children: [
    { path: 'detail', element: <Detail /> }
  ]
}
```

[路由链接：](/14-Router/04-search参数/pages/Message.jsx)
```jsx
<Link to={`detail?id=${item.id}&title=${item.title}&content=${item.content}`}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

[接收参数：](/14-Router/04-search参数/pages/Detail.jsx)
```jsx
import { useSearchParams } from 'react-router-dom'

const [search, setSearch] = useSearchParams()
const id = search.get('id')
const title = search.get('title')
const content = search.get('content')
```

### 注意事项
- search 参数没有类型信息，接收到的都是字符串。
- 查询参数需要使用 `get()` 逐个读取。
- 字符串中出现特殊字符时应该进行编码（例如 `encodeURIComponent`）。

---

## 07-路由参数（state）

### 用法
- state 参数通过 `Link` 或 `navigate()` 的 `state` 属性传递。
- 路由注册与 search 参数类似，只要定义目标路径即可。
- 在接收组件中用 `useLocation()` 读取 `location.state`。

[路由链接：](/14-Router/05-state参数/pages/Message.jsx)
```jsx
<Link to="detail" state={{ id: item.id, title: item.title, content: item.content }}>链接标题</Link>
{/* 指定路由展示的位置 */}
<Outlet />
```

[接收参数：](/14-Router/05-state参数/pages/Detail.jsx)
```jsx
import { useLocation } from 'react-router-dom'

const { state: { id, title, content } } = useLocation()
```

### 注意事项
- state 参数不会出现在 URL 中，适合传递临时数据。
- 刷新页面后 `location.state` 可能会丢失，不能当作永久存储。
- state保存在 `window.history.state.usr`

---

## 08-编程式路由导航

### 用法
- 使用 `useNavigate()` 获得导航函数 `navigate`。
- 通过 `navigate('detail', { replace: false, state: { ... } })` 实现动态跳转。
- `replace: true` 可以替换当前历史记录，避免返回到当前页。
- `navigate()` 也支持数字参数：`navigate(1)` 前进，`navigate(-1)` 后退。

[导航函数：](/14-Router/06-编程式路由导航/pages/Message.jsx)
```jsx
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()

function showDetailPanel(item) {
  navigate('detail', {
    replace: false,
    state: {
      id: item.id,
      content: item.content
    }
  })
}
```

### 注意事项
- 编程式导航可以在事件处理函数中使用，不依赖 `<Link>` , `<NavLink>`。
- 相对路径会基于当前路由自动拼接。
- `withRouter` 在 React Router 6 中已废弃，函数组件可以直接使用 `useNavigate()`，不需要再通过 `HOC` 包裹。

---

## 09-Redux精简版计算案例
用途：展示 Redux 最小实现（单一 reducer、store、组件直接 dispatch action object）。

### 用法
- 编写 `reducer` 负责根据 `action.type` 更新状态；
- `store` 通过 `legacy_createStore(reducer)` 创建，传入为其服务的 `reducer`；
- 组件通过 `store.dispatch({type, data})` 触发更新，并用 `store.getState()` 读取当前状态。
- `main.js` 中检测 store 中状态的改变，一旦发生改变，重新渲染 `<App/>`。 redux 只负责管理状态，至于状态的改变驱动着页面的展示，要靠自己写

[创建 store:](/12-Redux/01-精简版计算案例/redux/store.js)
```javascript
const store = legacy_createStore(countReducer)
```

[编写 reducer：](/12-Redux/01-精简版计算案例/redux/reducer.js)
```javascript
const initState = 0
export default function countReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case 'increment': return preState + data
    case 'decrement': return preState - data
    default: return preState
  }
}
```

[组件中获取状态，更新状态:](/12-Redux/01-精简版计算案例/Count.jsx)
```javascript
const count = store.getState()

store.dispatch({ type: 'increment', data: 1 })
```

[监测状态变化，重新渲染组件:](/12-Redux/01-精简版计算案例/main.jsx)
```javascript
store.subscribe(() => {
  root.render(<React.StrictMode><App /></React.StrictMode>)
})
```

## 10-Redux完整版计算案例
把常量、action creators、reducer、store 分离成模块化结构，示例更贴合生产代码风格。

### 用法
- 使用 `constant.js` 定义 action 类型常量，
- 使用 `actions.js` 导出 action creators（比如 `incrementAction(data)`），
- 组件通过 `store.dispatch(incrementAction(value))` 调用。

[constants:](/12-Redux/02-完整版计算案例/redux/constant.js)
```javascript
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

[action creators:](/12-Redux/02-完整版计算案例/redux/actions.js)
```javascript
export const incrementAction = data => ({ type: INCREMENT, data })
```

[组件中从 store 中读取状态，更新状态:](/12-Redux/02-完整版计算案例/Count.jsx)
```javascript
store.dispatch(incrementAction(value))
```

## 11-Redux异步action
展示如何使用 `redux-thunk` 支持异步逻辑（网络请求或定时器）再 dispatch 同步 action。

### 用法
- store 在创建时通过 `applyMiddleware(thunk)` 注册中间件；
- 异步 action 返回一个函数，函数接收 `dispatch`，内部可在异步完成后 `dispatch` 同步 action。

[创建 store:](/12-Redux/03-异步action/redux/store.js)
```javascript
import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = legacy_createStore(countReducer, applyMiddleware(thunk))
```

[异步 action:](/12-Redux/03-异步action/redux/actions.js)
```javascript
export const incrementAsyncAction = (data, delay) => {
  return (dispatch) => {
    setTimeout(() => { dispatch(incrementAction(data)) }, delay)
  }
}
```

### 注意事项（适用于以上示例）
- `state` 的单一来源由 `store` 保证，尽量避免直接在多处存放可变状态。
- 组件不要直接修改 `state`，应通过 `dispatch` 发出 action，由 reducer 产生新 state。
- 异步 action 在页面刷新时的 `state` 不持久化，必要时配合持久化方案（localStorage、后端）处理。


---

## 12-react-redux基础使用
- 明确两个概念
  - UI组件：不能使用任何redux的API，只负责页面的呈现，交互等
  - 容器组件：负责和redux通信，将结果交给UI组件

### 用法 
- `connect(mapStateToProps, mapDispatchToProps)(UIComponennt)` 创建并暴露一个容器组件，容器中的 `store` 是靠 `props` 传入的，而不是在容器组件中直接引入 
- `mapStateToProps(state)` 映射状态，返回值是一个对象
- `mapDispatchToProps(dispatch)` 映射操作状态的方法，返回值是一个对象 
- 在 UI 组件中通过 `props` 读取状态和操作状态的方法

[通过 `props` 给容器组件传入 `store`](/12-Redux/04-react-redux基础使用/App.jsx)
```js
import store from './redux/store'

<Count store={store} />
```

[容器组件](/12-Redux/04-react-redux基础使用/containers/Count.jsx)
```javascript
// 映射状态
const mapStateToProps = state => ({ count: state })

// 映射操作状态的方法
const mapDispatchToProps = dispatch =>  ({
  add: (num) => dispatch(incrementAction(num)),
  addAsync: (num, delay) => dispatch(incrementAsyncAction(num, delay)),
  minus: (num) => dispatch(decrementAction(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
```

[UI组件](/12-Redux/04-react-redux基础使用/components/Count.jsx)
```js
this.props.count

this.props.add(value)
```


## 13-融合UI组件与容器组件

### 用法
- 在应用入口用 `<Provider store={store}>` 包裹根组件，无需在App中为每个容器组件手动传入 `store` 
- 把 UI 与容器合并到同一文件
- `mapDispatchToProps` 也可以返回一个对象

[Provider包裹根组件](/12-Redux/05-融合UI组件与容器组件/main.jsx)
```jsx
<Provider store={store}>
  <App />
</Provider>
```

[UI组件与容器组件融合后的Count](/12-Redux/05-融合UI组件与容器组件/containers/Count.jsx)
```javascript
export default connect(
  state => ({ count: state }),
  { add: incrementAction, addAsync: incrementAsyncAction, reduce: decrementAction }
)(CountUI)
```

## 14-react-redux多组件数据共享
多个 reducer 合并，与不同组件间共享数据（如 `Count` 与 `Person` 组件）。

### 用法
- `reducers` 文件夹中，编写专门的 index.js 使用 `combineReducers` 汇总并暴露所有的 reducers。
- `mapStateToProps` 中根据合并后的 state 取对应属性（如 `state.count`, `state.persons`）。

[合并reducer](/12-Redux/06-react-redux数据共享/redux/reducers/index.js)
```javascript
import { combineReducers } from 'redux'
import countReducer from './count'
import personReducer from './person'

export default combineReducers({ count: countReducer, persons: personReducer })
```

[容器组件](/12-Redux/06-react-redux数据共享/containers/Count.jsx)
```javascript
export default connect(
  state => ({ count: state.count, persons: state.persons }),
  { add: incrementAction, reduce: decrementAction }
)(CountUI)     
```

### 注意事项
- 对于数组操作，`prevState.unshift()` 不会更新状态，需要 `[data, ...prevState]` 来更新数组的地址，这样才能触发更新。
- redux 的 reducer 必须是一个纯函数，
  - 不能改变参数，
  - 不能有副作用（如网络请求，输入输出设备）
  - 不能调用非纯函数（如 `Date.now()`，`Math.random()`）

---

## [15-setState的使用](/06-setState/02-setState-异步.js)

### 用法
- 不要直接修改 `this.state`，统一通过 `this.setState()` 触发状态更新和视图重渲染。
- 在 React 合成事件和生命周期中，`setState` 通常是异步批处理；如果要拿到更新后的值，可以使用 `setState(updater, callback)` 的回调，或在 `componentDidUpdate` 中读取。
- ~~在 `setTimeout`、原生 DOM 事件（如 `addEventListener`）中，示例里 `setState` 表现为同步可立即读取。~~
- 处理数组/对象等引用类型时，优先创建新引用（如展开运算符）再更新，避免直接改原数据导致 `PureComponent` / 浅比较失效。


### 注意事项
- `setState` 的异步/同步表现与触发上下文有关，实际开发中不要依赖“调用后立刻拿到新 state”。
- setState(newState, [callback]) 对象式， `callback` 是可选回调，在状态更新完毕，界面也更新后（`render` 调用后）才被调用
- setState(updater, [callback]) 函数式，`updater` 可以接收 `prevState` 和 `props` 作为参数，返回新的 state
- 对象式的 setState 是函数式的 setState 的语法糖 

---

## 16-lazyload的使用

### 用法
- 使用 `React.lazy(() => import('...'))` 对路由组件进行按需加载，减少首屏体积。
- 用 `<Suspense fallback={...}>` 包裹延迟组件，在资源加载完成前展示兜底 UI（如 `Loading`）。
- 常见搭配是“路由级懒加载”：在 `Routes` 内部渲染懒加载页面组件。

[示例代码：](/07-性能优化/00_lazyloading.js)
```jsx
import React, { Suspense, lazy } from 'react'

const About = lazy(() => import('./pages/About'))
const Home = lazy(() => import('./pages/Home'))

<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/about" element={<About />} />
    <Route path="/home" element={<Home />} />
  </Routes>
</Suspense>
```

---

## 17-useState
### 用法
- `useState` 用于在函数组件中创建本地状态，返回 `[state, setState]`。
- 可以定义多个状态变量，避免把所有内容放到一个对象里，写起来更清晰。
- 修改数组或对象时不要直接修改原值（push, unshift等），要返回新引用，例如 `setFriends([...friends, 'tom'])`。

[多个状态使用示例：](/13-Hooks/src/02-useState/01-多个状态的使用.js)
```jsx
const [count, setCount] = useState(0)
const [age, setAge] = useState(18)
const [friends, setFriends] = useState(['xiaoming', 'xiaohong'])
```

[复杂状态修改示例：](/13-Hooks/src/02-useState/02-复杂状态的修改.js)
```jsx
setFriends([...friends, 'tom'])
```

### 注意事项
- `useState` 的更新是替换值，不会自动合并对象属性。
- 对于引用类型，要创建新对象/数组，否则 React 可能不会检测到变化。
- `useState` 只能在组件顶层调用，不能放在条件、循环或嵌套函数中。
- 类组件中 `setState(updater)` 的 updater 在 `useState` 中也有对应的写法：setCount(count => count + 1)
- 类组件中 `setState(updater, callback)` 的 callback 在 `useState` 中没有对应的写法，需要在 `useEffect(()=>{}, [state])` 中使用。
- 函数组件每次渲染都会重新执行函数体：
  - useState 的状态不是函数局部变量，而是由 React 内部维护。
  - React 在每次渲染时，把最新的 state 提供给函数组件，所以看起来 state 被“保留下来”。

---

## 18-useEffect
### 用法
- `useEffect(() => { ... })` 会在组件渲染后执行副作用
- 第二个参数是依赖数组：
  - 不传：每次渲染后都执行。
  - `[]`：只在首次挂载后执行，相当于类组件的 `componentDidMount`。
  - `[dep]`：当依赖变化时执行，相当于类组件的 `componentDidUpdate`。
- `return () => { ... }` 用于清理副作用，可取消订阅或释放资源，类似类组件的 `componentWillUnmount`。

[useEffect 更新 document.title 的示例：](/13-Hooks/src/03-useEffect/02-useEffect的hook实现title的修改.js)
```jsx
useEffect(() => {
  document.title = counter
})
```

[订阅与取消订阅示例：](/13-Hooks/src/03-useEffect/03-useEffect模拟订阅和取消订阅.js)
```jsx
useEffect(() => {
  console.log('订阅事件，启动定时器，Ajax请求')
  return () => {
    console.log('取消订阅，清理定时器')
  }
}, [])
```

[多个 useEffect 示例：](/13-Hooks/src/03-useEffect/04-多useEffect一起使用.js)
```jsx
useEffect(() => { console.log('订阅事件，只在首次挂载后执行') }, [])
useEffect(() => { console.log('修改DOM，每次count变化后执行', count) }, [count])
```

### 注意事项
- 副作用函数在渲染后执行，不要把它写成影响渲染结果的逻辑。
- 清理函数会在组件卸载或下一次执行前调用，用于释放事件、定时器、订阅等。
- 可以用多个 `useEffect` 拆分不同职责，避免一个函数里塞太多逻辑。

---

## 19-useRef
### 用法
- `useRef()` 返回一个可变对象 `{ current: ... }`，在组件整个生命周期内保持不变。
- 常用于引用 DOM 元素：将 `ref={titleRef}` 绑定到元素上，再通过 `titleRef.current` 读取或修改 DOM。
- 也可用于保存不参与渲染的可变值，例如保存上一次的状态值。

[DOM 引用示例：](/13-Hooks/src/08-useRef/01-useRef引用DOM.js)
```jsx
const titleRef = useRef()
<h2 ref={titleRef}>RefHookDemo01</h2>
titleRef.current.innerHTML = 'Hello World'
```

[引用其他数据示例：](/13-Hooks/src/08-useRef/02-useRef引用其他数据.js)
```jsx
const numRef = useRef(count)
useEffect(() => { numRef.current = count }, [count])
```

### 注意事项
- `useRef` 修改 `current` 并不会触发组件重新渲染。
- 如果希望获取 DOM 元素，确保绑定在原生标签或支持 ref 的组件上。
- `useRef` 可以用来保存上一次的值、定时器 id、或者任意不需要触发渲染的可变数据。

---

## [20-Fragment](/07-性能优化/01_Fragment.js)
### 用法
- `<>` 可以用来包裹多个子元素，避免多层嵌套，最终的页面上会被移除。
- `Fragment` 同样可以用来包裹多个子元素，避免多层嵌套。
- 区别在于，`<>` 不能有任何属性，但是 `Fragment` 可以有 `key` 和其他属性，但最终页面上都会被移除。

---

## 21-性能优化
- Component的2个问题：
  - 只要调用了 `setState` ，即便不改变状态数据（传入空对象 `{}`），就会重新渲染
  - 父组件重新 render 会导致子组件也 render，即便自身并没有变化（见 [02_组件嵌套的render调用.js](/07-性能优化/02_组件嵌套的render调用.js)）。
- 解决方案：
  - 控制更新：使用 `shouldComponentUpdate(nextProps, nextState)` 自定义更新条件，避免不必要更新（见 [03_shouldComponentUpdate.js](/07-性能优化/03_shouldComponentUpdate.js)）。
  - `PureComponent`：通过浅比较自动阻止相同 props/state 的重复渲染，适用于类组件（见 [04_PureComponent.js](/07-性能优化/04_PureComponent.js)）。
  - `React.memo`：为函数组件提供类似的浅比较优化，可传入自定义比较函数（见 [05_memo的使用.js](/07-性能优化/05_memo的使用.js)）。
- 总结：
  - 无变化时的渲染：即使组件自身无变化，父组件 render 可能触发子组件 render，结合 `PureComponent`/`memo` 或 `shouldComponentUpdate` 可避免（见 [06_组件本身无变化是否渲染.js](/07-性能优化/06_组件本身无变化是否渲染.js)）。
  - 引用类型注意：更新数组/对象需返回新引用（如展开运算符），否则浅比较无法检测到变化（见 [07_数组地址无变化是否渲染.js](/07-性能优化/07_数组地址无变化是否渲染.js)）。
    - 点击 push
      | 组件类型                  | render是否执行 | UI是否更新        | 原因                                    |
      | --------------------- | ---------- | ------------- | ------------------------------------- |
      | ClassComponent        | ✅ 会        | ⚠️ 不保证 | Component默认render，但state被直接修改，违反不可变原则 |
      | ClassPureComponent    | ❌ 不会       | ❌ 不会          | shallow compare发现arr引用没变              |
      | FunctionComponent     | ❌ 不会       | ❌ 不会          | useState内部Object.is判断state没变          |
      | MemoFunctionComponent | ❌ 不会       | ❌ 不会          | 同上，state引用没变                          |

    - 点击 destructure
      | 组件类型                  | render是否执行 | UI是否更新 | 原因                   |
      | --------------------- | ---------- | ------ | -------------------- |
      | ClassComponent        | ✅ 会        | ✅ 会    | setState触发render     |
      | ClassPureComponent    | ✅ 会        | ✅ 会    | shallow compare发现新引用 |
      | FunctionComponent     | ✅ 会        | ✅ 会    | useState发现新state     |
      | MemoFunctionComponent | ✅ 会        | ✅ 会    | state变化一定render      |

### 注意事项
- `useMemo` 可以缓存组件，也可以缓存组件中的函数，避免组件重新渲染时重复执行。

---


## 22-Context

### 用法
```jsx
// 创建Context
const MyContext = React.createContext({
    // 默认值
})

// 提供Context
<MyContext.Provider value={{/* 实际值 */}}>
  <Parent />
</MyContext.Provider>

// 消费Context
function Child() {
  return (
    <MyContext.Consumer>
      {value => <div>{value.name}</div>}
    </MyContext.Consumer>
  )
}
```


## 23-高阶组件(Higher-Order Component)

### 用法
- 高阶组件（HOC）本质上是一个函数：接受一个组件作为参数，返回一个新的增强组件。
- 典型用途包括增强 props、复用 Context 消费逻辑、鉴权等。
- 可以在 HOC 内部用类组件或函数组件包装 `WrappedComponent`，并通过 `{...props}` 透传原始 props。
- 使用 `displayName` 可以给返回组件命名，方便调试和 DevTools 识别。

[基本定义示例：](/10-高阶组件/01-高阶组件的定义.js)
```js
function enhanceComponent(WrappedComponent) {
  return props => <WrappedComponent {...props} />
}
```

[增强 props 示例：](/10-高阶组件/02-高阶组件的应用-增强props.js)
- 通过 HOC 向多个组件统一注入额外 props（比如 `region='中国'`），避免在父组件中层层传值。

[复用 Context 消费逻辑：](/10-高阶组件/03-高阶组件的应用-createContext.js)
- HOC 可封装 `UserContext.Consumer`，把 Context 数据注入 `WrappedComponent`，减少重复代码。

[鉴权示例：](/10-高阶组件/04-高阶组件的应用-鉴权.js)
- 通过 HOC 包裹需要鉴权的组件，根据 `isLogin` 决定渲染目标组件或登录页。

### 注意事项
- HOC 只负责增强组件行为，不要直接修改被包装组件的实现。
- 传递给 `WrappedComponent` 的 props 要使用 `{...props}` 透传，避免丢失原始 props。
- HOC 在组件定义阶段生成，不要在 render 过程中动态创建。

---

## 24-自定义slot
用途：演示 React 中自定义插槽（slot）和 render props 的使用方式。

### 用法
- `NavBar` 通过 `this.props.children` 作为默认插槽，把组件标签体内传入的 JSX 按顺序渲染到不同位置。缺点是顺序固定，未传入时会出现 `undefined`。
- `NavBar2` 使用命名 slot props（`leftSlot`、`centerSlot`、`rightSlot`），可显式控制插槽内容和顺序，增强组件复用性。
- `NavBar3` 使用 render props：将一个函数作为属性传入，子组件在渲染时调用该函数并传入内部数据，函数返回 JSX。这样父组件可以根据子组件状态定制插槽内容。

[例子：](/09-自定义slot/App.jsx)
```jsx
<NavBar3
  leftSlot={(name) => <span>aaa3-{name}</span>}
  centerSlot={(name) => <strong>bbb3-{name}</strong>}
  rightSlot={(name) => <a href="/#">ccc3-{name}</a>}
/>
```

[父组件内部使用 render props：](/09-自定义slot/NavBar3.jsx)
```jsx
<div className="navLeft">{leftSlot(name)}</div>
```

---

## 25-组件间通信方式

### 组件间关系
- 父子组件
- 兄弟组件
- 祖孙组件

### 几种通信方式
- props [使用props通信](./05-通信/01-使用props通信.js)
  - children props
  - render props
- context: provider/consumer [使用context通信](./05-通信/02-使用context通信-类式组件.js)
- 集中式管理：redux
- 消息订阅-发布：pubsub, event

### 比较好的搭配方式
- 父子组件：props
- 兄弟组件：消息订阅-发布，集中式管理
- 祖孙组件：消息订阅-发布，集中式管理，context（发开中用的少，自定义封装插件中用的多）