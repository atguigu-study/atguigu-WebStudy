import React, { Component } from 'react'

// Header
function Header() {
  console.log('Header被调用')
  return <h2>我是Header组件</h2>
}

// Main
class Banner extends Component {
  render() {
    console.log('Banner render函数被调用')
    return <h3>我是Banner组件</h3>
  }
}

function ProductList() {
  console.log('ProductList被调用')
  return (
    <ul>
      <li>商品列表1</li>
      <li>商品列表2</li>
      <li>商品列表3</li>
      <li>商品列表4</li>
      <li>商品列表5</li>
    </ul>
  )
}

class Main extends Component {
  render() {
    console.log('Main render函数被调用')
    return (
      <div>
        <Banner />
        <ProductList />
      </div>
    )
  }
}

// Footer
function Footer() {
  console.log('Footer被调用')
  return <h2>我是Footer组件</h2>
}


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
  }

  render() {
    console.log('App render函数被调用')
    return (
      <div>
        <h2>当前计数: {this.state.counter}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }

  // 所有组件的render函数被调用的原因是：
  // App组件的state发生了改变，导致App组件重新渲染，进而导致Header、Main、Footer组件也重新渲染
  // 解决方案：
  // 1）使用shouldComponentUpdate，prevProps判断子组件是否需要重新渲染，prevState判断自身组件是否需要重新渲染
  // 2）使用PureComponent，PureComponent内部已经实现了shouldComponentUpdate方法，使用浅比较来判断组件是否需要重新渲染（array.push由于引用地址没有改变，不会触发组件的重新渲染重新渲染）
  // 并且会比较所有的props和state，不需要自己在shouldComponentUpdate中一个个手动比较了
  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}
