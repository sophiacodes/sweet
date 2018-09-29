import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FeaturedStores from '../../components/marketplace/featured-stores/Featured-Stores'

class Home extends Component {
  
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      allStores: []
    }
  }

  componentWillMount() {
    this.props.fetchAllStores(this.contracts)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        allStores: nextProps.allStores || []
    })
  }

  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 featured">
            <h2>Featured Stores</h2>
            <FeaturedStores 
              allStores={this.state.allStores}
            />
          </div>
        </div>
      </main>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

export default Home
