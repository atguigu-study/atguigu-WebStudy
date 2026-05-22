import React, { Component, PureComponent, useState, memo } from 'react'

class ClassComponent extends Component {

  render() {
    console.log('Class Component被调用')
    return <>
      <h2>我是Class Component组件</h2>
    </>
  }
}

class ClassPureComponent extends PureComponent {
  
  render() {
    console.log('Class PureComponent被调用')
    return <>
      <h2>我是Class PureComponent组件</h2>
    </>
  }
}

function FunctionComponent() {
  console.log('Function Component被调用')
  return <>
    <h2>我是Function Component组件</h2>
  </>
}

const MemoFunctionComponent = memo(function FunctionComponent() {
  console.log('Memo Function Component被调用')
  return <>
    <h2>我是Memo Function Component组件</h2>
  </>
})

// 性能优化的核心就是减少不必要的组件重新渲染，类组件可以通过shouldComponentUpdate来控制组件是否需要重新渲染，或者使用PureComponent；函数组件可以通过React.memo来实现类似PureComponent的功能来控制组件是否需要重新渲染
export default class App extends Component {
  render() {
    console.log('App render函数被调用')
    return (
      <div>
        <button onClick={e => this.setState({})}>点击触发App组件重新渲染</button>
        <ClassComponent />
        <FunctionComponent />
        <ClassPureComponent />
        <MemoFunctionComponent />
      </div>
    )
  }
}