import React, { Component } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import AssetDetails from  '../../components/marketplace/asset-details/Asset-Details'

class Asset extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.state = {
      assetDetails: {}
    }
  }
  componentWillMount() {
    console.log('capture link params', this.props.params.assetId)
    this.getAssetDetails();
  }
  getAssetDetails = async () => {
    const assetId = this.props.params.assetId;
    const data = await this.contracts.Marketplace.methods.asset(assetId).call();
    const toEtherAssetPriceConversion = parseFloat(data.price) / 1000000000000000000;
    const assetDetails = {
      storeOwner: data.storeOwner,
      name: data.name,
      description: data.description,
      price: toEtherAssetPriceConversion,
      assetId: data.assetId,
      buyer: data.buyer,
      sold: data.sold
    };
    this.setState({
      assetDetails
    })
  }
  buyNow = async (assetDetails) => {
    const buyerAddress = this.props.accounts[0];
    const toWeiAssetPriceConversion = parseFloat(assetDetails.price) * 1000000000000000000;
    const sendParams = {
      from: buyerAddress,
      gas: 3000000,
      value: toWeiAssetPriceConversion
    };
    console.log(assetDetails, buyerAddress, sendParams)
    const buyStatus = await this.contracts.Marketplace.methods.buyAsset(assetDetails.assetId, buyerAddress).send(sendParams).then((receipt) => {
      console.log('buyStatus', receipt);
      // this.getAllStores();
      return receipt;
    })
    .catch((error) => {
      return error;
    });
  }
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Asset Details</h2>
            <p>Notification message area</p>
          </div>
          <div className="pure-u-1-1">
            <h3>[Name of store]</h3>
            <Link to={`/store/${this.props.params.storeId}`}><span className="chevron">&lt;</span>Back to store</Link>
            {this.state.assetDetails && (
              <AssetDetails 
                assetDetails={this.state.assetDetails}
                onClick={this.buyNow}
              />
            )}
          </div>
        </div>
      </main>
    )
  }
}

Asset.contextTypes = {
  drizzle: PropTypes.object
};

export default Asset
