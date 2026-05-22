import React, { Component, PureComponent, useState, memo } from 'react'

class ClassComponent extends Component {
  state = {
    arr: [1, 2, 3]
  }

  // push方法不会改变数组的引用地址，因此不会触发组件的重新渲染，尽管类组件的render函数被调用了，但UI没有更新
  push = () => {
    const { arr } = this.state;
    arr.push(arr.length + 1);
    this.setState({ arr });
  }

  deconstruct = () => {
    this.setState({ arr: [...this.state.arr, this.state.arr.length + 1] });
  }

  render() {
    console.log('ClassComponent被调用')
    return <>
      <h2>我是Class Component组件, array: {this.state.arr}</h2>
      <button onClick={this.push}>array push</button>
      <button onClick={this.deconstruct}>array deconstruct</button>
    </>
  }
}

class ClassPureComponent extends PureComponent {
  state = {
    arr: [1, 2, 3]
  }

  // push方法不会改变数组的引用地址，因此不会触发组件的重新渲染，并且类组件的render函数没有被调用，行为类似于函数组件
  push = () => {
    this.state.arr.push(this.state.arr.length + 1);
    this.setState({ arr: this.state.arr });
  }

  deconstruct = () => {
    this.setState({ arr: [...this.state.arr, this.state.arr.length + 1] });
  }

  render() {
    console.log('ClassPureComponent被调用')
    return <>
      <h2>我是ClassPureComponent组件, array: {this.state.arr}</h2>
      <button onClick={this.push}>array push</button>
      <button onClick={this.deconstruct}>array deconstruct</button>
    </>
  }
}

function FunctionComponent() {
  const [arr, setArr] = useState([1, 2, 3]);

  // push方法不会改变数组的引用地址，因此不会触发组件的重新渲染，函数组件的render函数也没有被调用
  const push = () => {
    arr.push(arr.length + 1);
    setArr(arr);
  }

  const deconstruct = () => {
    setArr([...arr, arr.length + 1]);
  }

  console.log('FunctionComponent被调用')
  return <>
    <h2>我是Function Component组件, array: {arr}</h2>
    <button onClick={push}>array push</button>
    <button onClick={deconstruct}>array deconstruct</button>
  </>
}

const MemoFunctionComponent = memo(function FunctionComponent() {
  const [arr, setArr] = useState([1, 2, 3]);

  // push方法不会改变数组的引用地址，因此不会触发组件的重新渲染，函数组件的render函数也没有被调用
  const push = () => {
    arr.push(arr.length + 1);
    setArr(arr);
  }

  const deconstruct = () => {
    setArr([...arr, arr.length + 1]);
  }

  console.log('MemoFunctionComponent被调用')
  return <>
    <h2>我是Memo Function Component组件, array: {arr}</h2>
    <button onClick={push}>array push</button>
    <button onClick={deconstruct}>array deconstruct</button>
  </>
})

export default class App extends Component {
  render() {
    console.log('App render函数被调用')
    return (
      <div>
        <ClassComponent />
        <ClassPureComponent />
        <FunctionComponent />
        <MemoFunctionComponent />
      </div>
    )
  }
}