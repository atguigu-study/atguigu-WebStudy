import React, { Component } from 'react'


class Header extends Component {

  shouldComponentUpdate(prevProps, prevState) {
    const counterChanged = prevProps.counter !== this.props.counter;
    console.log(counterChanged ? 'counter改变才渲染Header组件' : 'counter未改变，不渲染Header组件')
    return counterChanged;
  }

  render() {
    console.log('Header render函数被调用')
    return <h2>我是Header组件，counter：{this.props.counter}</h2>
  }
}

class Footer extends Component {

  shouldComponentUpdate(prevProps, prevState) {
    const textChanged = prevProps.text !== this.props.text;
    console.log(textChanged ? 'text改变才渲染Footer组件' : 'text未改变，不渲染Footer组件')
    return textChanged;
  }

  render() {
    console.log('Footer render函数被调用')
    return <h2>我是Footer组件，text：{this.props.text}</h2>
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0,
      message: 'Hello World',
      arr: [1, 2, 3]
    }
  }

  shouldComponentUpdate(prevProps, prevState) {
    console.log('previous props:', prevProps, 'current props:', this.props)
    console.log('previous state:', prevState, 'current state:', this.state)
    
    const counterChanged = prevState.counter !== this.state.counter;
    const messageChanged = prevState.message !== this.state.message;
    console.log(counterChanged || messageChanged ? 'counter或message改变才渲染App组件' : 'counter和message都未改变，不渲染App组件')
    return counterChanged || messageChanged;
  }

  render() {
    console.log('App render函数被调用')
    return (
      <div>
        <Header counter={this.state.counter} />
        <h2>当前状态: {this.state.counter}，{this.state.message}，{this.state.arr}</h2>
        <button onClick={e => this.increment()}>+1</button>
        <button onClick={e => this.changeText()}>改变文本</button>
        <button onClick={e => this.addNum()}>添加数字</button>
        <Footer text={this.state.message} />
      </div>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  changeText() {
    this.setState({
      message: 'Hello React'
    })
  }

  decrement() {
    this.setState({
      counter: this.state.counter - 1
    })
  }

  addNum() {
    this.setState({
      arr: [...this.state.arr, this.state.arr.length + 1]
    })
  }
}