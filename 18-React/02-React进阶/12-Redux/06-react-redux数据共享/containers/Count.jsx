import React, { Component } from 'react'
// 用于连接UI组件与redux
import { connect } from 'react-redux'
import { incrementAction, incrementAsyncAction, decrementAction } from '../redux/actions/count'

// 定义UI组件
class Count extends Component {
  // 加
  increment = () => {
    const { value } = this.selectNumber
    this.props.add(value*1)
  }
  // 减
  decrement = () => {
    const { value } = this.selectNumber
    this.props.minus(value*1)
  }
  // 和为奇数时再加
  incrementIfOdd = () => {
    if (this.props.count % 2 === 0) return
    const { value } = this.selectNumber
    this.props.add(value*1)
  }
  // 异步加
  incrementIfAsync = () => {
    const { value } = this.selectNumber
    this.props.addAsync(value*1, 1000)
  }

  render() {
    return (
      <div>
        <h2>Count组件</h2>
        <h1>当前求和为{this.props.count}；下方组件总人数为{this.props.personNum}</h1>&nbsp;
        <select ref={c => this.selectNumber = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementIfOdd}>和为奇数时再加</button>&nbsp;
        <button onClick={this.incrementIfAsync}>异步加</button>
      </div>
    )
  }
}

// 定义容器组件
export default connect(
  // mapStateToProps，用于映射状态
  // 此处的值传入UI组件中，UI组件可使用this.props.xxx拿到对应的值
  state => ({
    count: state.count,
    personNum: state.persons.length
  }),
  // mapDispatchToProps，用于映射操作状态的方法
  {
    add: incrementAction,
    addAsync: incrementAsyncAction,
    minus: decrementAction
  }
)(Count)
