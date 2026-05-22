import React, { Component, Fragment } from 'react'

const students = [
  { id: 1, name: 'tom', age: 18 },
  { id: 2, name: 'jerry', age: 19 },
  { id: 3, name: 'hmm', age: 20 }
]

function ComponentA() {
  return students.map(item => {
    return <>
      <span>名字: {item.name} 年龄: {item.age}</span>
      <br />
    </>
  })
}

function ComponentB() {
  return (
    students.map(item => {
      return <Fragment key={item.id}>
        <span>名字: {item.name} 年龄: {item.age}</span>
        <br />
      </Fragment>
    })
  )
}

export default class App extends Component {
  render() {
    return (
      <>
        <ComponentA />
        <ComponentB />
      </>
    )
  }
}
