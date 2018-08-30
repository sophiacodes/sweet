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
    this.getAllStores();
  }

  getAllStores = async () => {
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
