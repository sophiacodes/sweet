import React from 'react'
import './footer.css'

const Footer = () => {
    return(
      <div className="footer">
        <div className="pure-u-1-3 copy">
          <p>&copy; 2018</p>
        </div>
        <div className="pure-u-1-3 mini-logo">
          <p>EthBay</p>
        </div>
        <div className="pure-u-1-3 powered-by">
          <p>Powered by an Ethereum Smart Contract</p>
        </div>
      </div>
    )
}

export default Footer
