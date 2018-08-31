import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StoreAssets from '../../components/marketplace/store-assets/Store-Assets'

class Storefront extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.storeId = this.props.params.storeId;
    this.state = {
      allAssets: [],
      store: {}
    }
  }

  componentWillMount() {
    this.getStoreDetails();
    this.getAssets();
  }

  getAssets = async () => {
    const assetCount = await this.contracts.Marketplace.methods.assetIdCounter().call();
    let allAssets = [];
    for (let i = 0; i < assetCount; i++) {
      const data = await this.contracts.Marketplace.methods.asset(i).call();
      if (data.storeOwner === this.storeId && !data.sold) {
        const store = {
          storeOwner: data.storeOwner,
          name: data.name,
          description: data.description,
          price: data.price,
          assetId: data.assetId,
          buyer: data.buyer,
          sold: data.sold
        };
        allAssets = [ ...allAssets, store ];
      }
    }
    this.setState({
      allAssets
    })
  }

  getStoreDetails = async () => {
    const storeOwnerAddress = this.storeId;
    const data = await this.contracts.Marketplace.methods.store(storeOwnerAddress).call();
    const store = {
      approved: data.approved,
      // balance: data.balance,
      name: data.name,
      owner: data.owner,
      storeId: data.storeId
    };
    this.setState({
      store
    })
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">{this.state.store.name || 'Storefront'}</h2>
          </div>
          <div className="pure-u-1-1 featured">
            <StoreAssets 
              store={this.state.store}
              allAssets={this.state.allAssets}
            />
          </div>
        </div>
      </main>
    )
  }
}

Storefront.contextTypes = {
  drizzle: PropTypes.object
};

export default Storefront
