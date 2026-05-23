import React, { useState } from 'react'

// 使用render props，Parent组件可以把name传递给Child组件
export default function App() {
  return (
    <div>
        <Parent render={(name) => <Child name={name} />} />
    </div>
  )
}


function Parent(props) {
    const [name, setName] = useState("tom");

    return (
    <div>
        <div>我是Parent组件</div>
        {props.render(name)}
    </div>
  )
}

function Child(props) {
  return (
    <div>我是Child组件，我的名字是{props.name}</div>
  )
}