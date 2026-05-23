import React, { useState } from 'react'

// 使用this.props.children，Parent无法把name传递给Child组件
export default function App() {
  return (
    <div>
        <Parent>
            <Child/>            
        </Parent>
    </div>
  )
}

function Parent(props) {
    const [name, setName] = useState("tom");

    return (
    <div>
        <div>我是Parent组件</div>
        {props.children}
    </div>
  )
}

function Child(props) {
  return (
    <div>我是Child组件，我的名字是{props.name}</div>
  )
}