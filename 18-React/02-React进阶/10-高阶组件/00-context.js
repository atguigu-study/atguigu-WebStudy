import React, { Component, useContext } from 'react'

const MyContext = React.createContext();

export default class App extends Component {
  render() {
    return (
      <MyContext.Provider value={{ name: 'Tom', age: 18 }}>
        <A />
      </MyContext.Provider>
    )
  }
}

class A extends Component {
  render() {
    return (
      <div>
        <B />
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <C />
        <D />
        <E />
      </div>
    )
  }
}

// 通过声明静态属性contextType来获取context中的对象，适用于类组件
class C extends Component {
  static contextType = MyContext;
  render() {
    return (
      <div>name:{this.context.name}, age:{this.context.age}</div>
    )
  }
}

// 通过Consumer组件来获取context对象，适用于函数组件和类组件
function D() {
  return (
    <MyContext.Consumer>
    {
      value => {
        return <div>name:{value.name}, age:{value.age}</div>
      }
    }
    </MyContext.Consumer>
  )
}

// 通过useContext钩子函数来获取context对象，适用于函数组件
function E() {
  const userContext = useContext(MyContext)
  return (
    <div>name:{userContext.name}, age:{userContext.age}</div>
  )
}