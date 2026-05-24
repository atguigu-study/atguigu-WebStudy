import React, { useRef, useState, useEffect } from 'react'

export default function RefHookDemo02() {
  const [count, setCount] = useState(0)

  const numRef = useRef(count)
  console.log("新的ref创建了: ", numRef);

  useEffect(() => {
    numRef.current = count
    console.log("ref更新了: ", numRef);
  }, [count])

  return (
    <div>
      <h2>count上一次的值: {numRef.current}</h2>
      <h2>count这一次的值: {count}</h2>
      <button onClick={e => setCount(count + 10)}>+10</button>
    </div>
  )
}
