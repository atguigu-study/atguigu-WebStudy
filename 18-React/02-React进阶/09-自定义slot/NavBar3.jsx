import React, { Component } from 'react'

class NavBar3 extends Component {

  state = {
    name: "tom"
  }

  render() {
    const { name } = this.state;
    const { leftSlot, centerSlot, rightSlot } = this.props

    return (
      <div className='navBar'>
        <div className="navLeft">
          {leftSlot(name)}
        </div>
        <div className="navItem navCenter">
          {centerSlot(name)}
        </div>
        <div className="navItem navRight">
          {rightSlot(name)}
        </div>
      </div>
    );
  }
}

export default NavBar3;