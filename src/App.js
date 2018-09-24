import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './components/core/header/Header'
import Hero from './components/core/hero/Hero'
import Navigation from './components/core/navigation/Navigation'
import Footer from './components/core/footer/Footer'
// Styles
import './css/reset.css'
import './css/oswald.css'
import './css/open-sans.css'
import './css/lobster.css'
import './css/lobster-two.css'
import './css/sawarabi-mincho.css'
import './css/indie-flower.css'
import './css/work-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {

  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
  }

  componentWillReceiveProps(nextProps) {
    /*** DETECT WHEN WALLET ADDRESS CHANGES ***/
    this.checkAdminRights(nextProps.accounts[0])
  }

  checkAdminRights = async (account) => {
    const admin = await this.contracts.Marketplace.methods.admin().call();
    if (admin && admin === account) {
      if (this.props.location.pathname === '/profile') {
        this.props.router.push('/admin')
      }
    } else {
      // If user is in admin page and not admin direct to profile page
      if (this.props.location.pathname === '/admin') {
        this.props.router.push('/profile')
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.props.location.pathname === '/' && (<Hero />)} 
        <Navigation currentPathname={this.props.location.pathname} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  drizzle: PropTypes.object
};

export default App
