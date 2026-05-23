import React, { Component } from 'react'
import NavBar from './NavBar'
import NavBar2 from './NavBar2'
import NavBar3 from './NavBar3'

class App extends Component {
  render() {
    return (
      <div>
        {/* slot1，缺点：无法打乱顺序，当未全传入值时则为undefined */}
        <NavBar name="" title="" className="">
          <span>aaa</span>
          <strong>bbb</strong>
          <a href="/#">ccc</a>
        </NavBar>

        {/* slot2 */}
        <NavBar2 leftSlot={<span>aaa2</span>} centerSlot={<strong>bbb2</strong>} rightSlot={<a href="/#">ccc2</a>} />

        {/* slot3 */}
        <NavBar3 leftSlot={(name) => <span>aaa3-{name}</span>} centerSlot={(name) => <strong>bbb3-{name}</strong>} rightSlot={(name) => <a href="/#">ccc3-{name}</a>} />
      </div>
    );
  }
}

export default App;