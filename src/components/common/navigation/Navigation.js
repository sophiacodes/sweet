import React from 'react'
import { Link } from 'react-router'
import './navigation.css'

const Navigation = ({...props}) => {
    return (
        <div className="navigation">
          {props.currentPathname !== '/' && props.currentPathname !== '/marketplace' && (<Link to="/marketplace">Browse</Link>)}
          <Link to="/profile">My Account</Link>
        </div>
    )
}

export default Navigation;