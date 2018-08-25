import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import StoreAssets from '../../components/marketplace/store-assets/Store-Assets'

class Storefront extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.storeId = this.props.params.storeId;
    this.state = {
      allAssets: []
    }
  }

  componentWillMount() {
    console.log('capture link params', this.props.params.storeId)
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
    console.log('thi.s', this.state)
  }
  // getAllStores = async () => {console.log(this.contracts)
  //   const getStores = await this.contracts.Marketplace.methods.getAllStores().call();
  //   let allStores = [];
  //   for (let i = 0; i < getStores.length; i++) {
  //     const data = await this.contracts.Marketplace.methods.store(getStores[i]).call();
  //     const store = {
  //       approved: data.approved,
  //       balance: data.balance,
  //       name: data.name,
  //       owner: data.owner,
  //       storeId: data.storeId
  //     };
  //     allStores = [ ...allStores, store ];
  //   }
  //   this.setState({
  //     allStores
  //   })
  // }

  getStoreDetails = async () => {
    const storeOwnerAddress = this.storeId;
    const data = await this.contracts.Marketplace.methods.store(storeOwnerAddress).call();
    const store = {
      approved: data.approved,
      balance: data.balance,
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
            <h2 className="page-title">Storefront</h2>
          </div>
          <div className="pure-u-1-1 featured">
            <StoreAssets 
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
