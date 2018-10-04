import React from 'react'
import { Link } from 'react-router'
import './hero.css'

const Hero = () => {
    return (
        <div className="pure-u-1-1 hero">
          <p className="title">The blockchain-based marketplace for</p>
          <p className="sub-title">crypto assets</p>
          <p><Link className="button" to="/marketplace">Browse</Link></p>
        </div>
    )
}

export default Hero;
