import React, { Component } from 'react'
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

export default App
