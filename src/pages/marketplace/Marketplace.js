import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FeaturedStores from '../../components/marketplace/featured-stores/Featured-Stores'
import StoreAssets from '../../components/marketplace/store-assets/Store-Assets'

class Marketplace extends Component {

  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts
    this.state = {
      allStores: [],
      allAssets: []
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
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Marketplace</h2>
          </div>
          <div className="pure-u-1-1">
            <h3>Browse stores</h3>
            <FeaturedStores 
              allStores={this.state.allStores}
            />
          </div>
          <div className="pure-u-1-1">
            <h3>Browse assets</h3>
            <StoreAssets 
              allAssets={this.state.allAssets}
            />
          </div>
        </div>
      </main>
    )
  }
}

Marketplace.contextTypes = {
  drizzle: PropTypes.object
}

export default Marketplace
