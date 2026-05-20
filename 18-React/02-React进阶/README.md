# React进阶知识学习

将子文件夹中代码复制到根目录的src文件夹内即可运行 `npm run dev`，具体笔记在相关子文件夹

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

const [search] = useSearchParams()
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

创建 store:
```javascript
const store = legacy_createStore(countReducer)
```

编写 reducer：
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

组件中获取状态，更新状态:
```javascript
const count = store.getState()

store.dispatch({ type: 'increment', data: 1 })
```

监测状态变化，重新渲染组件:
```javascript
store.subscribe(() => {
  root.render(<React.StrictMode><App /></React.StrictMode>)
})
```

### 10-Redux完整版计算案例
把常量、action creators、reducer、store 分离成模块化结构，示例更贴合生产代码风格。

### 用法
- 使用 `constant.js` 定义 action 类型常量，
- 使用 `actions.js` 导出 action creators（比如 `incrementAction(data)`），
- 组件通过 `store.dispatch(incrementAction(value))` 调用。

constants:
```javascript
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

action creators:
```javascript
export const incrementAction = data => ({ type: INCREMENT, data })
```

组件中从 store 中读取状态，更新状态:
```javascript
store.dispatch(incrementAction(value))
```

## 11-Redux异步action
展示如何使用 `redux-thunk` 支持异步逻辑（网络请求或定时器）再 dispatch 同步 action。

### 用法
- store 在创建时通过 `applyMiddleware(thunk)` 注册中间件；
- 异步 action 返回一个函数，函数接收 `dispatch`，内部可在异步完成后 `dispatch` 同步 action。

创建 store:
```javascript
import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const store = legacy_createStore(countReducer, applyMiddleware(thunk))
```

异步 action:
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
- 使用 `combineReducers` 合并多个 reducer，使 `state` 结构变为 `{ count, persons }`。
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





