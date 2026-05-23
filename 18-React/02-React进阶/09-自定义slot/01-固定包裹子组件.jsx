import React, { useState } from 'react'

export default function App() {
  return (
    <div>
        <Parent />
    </div>
  )
}


function Parent() {
    const [name, setName] = useState("tom");

    return (
    <div>
        <div>我是Parent组件</div>
        <Child name={name}/>
    </div>
  )
}

function Child(props) {
  return (
    <div>我是Child组件，从Parent组件接收到的名字是{props.name}</div>
  )
}