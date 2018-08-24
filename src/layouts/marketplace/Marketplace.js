import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FeaturedStores from '../../components/marketplace/layouts/featured-stores/Featured-Stores'

class Marketplace extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.state = {
      allStores: []
    }
  }
  componentWillMount() {
    this.getAllStores();
  }
  getAllStores = async () => {console.log(this.contracts)
    const getStores = await this.contracts.Marketplace.methods.getAllStores().call();
    let allStores = [];
    for (let i = 0; i < getStores.length; i++) {
      const data = await this.contracts.Marketplace.methods.store(getStores[i]).call();
      const store = {
        approved: data.approved,
        balance: data.balance,
        name: data.name,
        owner: data.owner,
        storeId: data.storeId
      };
      allStores = [ ...allStores, store ];
    }
    this.setState({
      allStores
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
            <h3>Browse assets</h3> carousel
            {/* <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p> */}
          </div>
        </div>
      </main>
    )
  }
}

Marketplace.contextTypes = {
  drizzle: PropTypes.object
};

export default Marketplace
