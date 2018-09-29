import React, { Component } from 'react'
import { Link } from 'react-router'
import './header.css'

class Header extends Component {
  render() {
    return(
      <div className="header">
        <h1><Link to="/">EthBay</Link></h1>
      </div>
    )
  }
}

export default Header
