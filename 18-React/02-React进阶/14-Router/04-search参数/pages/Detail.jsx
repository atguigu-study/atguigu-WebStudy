import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [search, setSearch] = useSearchParams()
  const id = search.get('id')
  const title = search.get('title')
  const content = search.get('content')
  return (
    <ul>
      <li>ID：{id}</li>
      <li>标题：{title}</li>
      <li>内容：{content}</li>
      <button onClick={() => setSearch('id=001&title=你好&content=哈哈')}>点我更新search参数</button>
    </ul>
  )
}
