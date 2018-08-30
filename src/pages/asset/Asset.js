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
      assetDetails: {},
      disabled: false,
      buyStatus: {}
    }
  }

  componentWillMount() {
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
      price: parseFloat(toEtherAssetPriceConversion).toFixed(3),
      assetId: data.assetId,
      buyer: data.buyer,
      sold: data.sold
    };
    this.setState({
      assetDetails
    })
  }

  buyNow = async (assetDetails) => {
    this.setState({
      disabled: true,
      buyStatus: {}
    })
    const buyerAddress = this.props.accounts[0];
    const toWeiAssetPriceConversion = parseFloat(assetDetails.price) * 1000000000000000000;
    const sendParams = {
      from: buyerAddress,
      gas: 3000000,
      value: toWeiAssetPriceConversion
    };

    await this.contracts.Marketplace.methods.buyAsset(assetDetails.storeOwner, assetDetails.assetId).send(sendParams)
    .then((receipt) => {
      this.setState({
        disabled: true,
        buyStatus: {
          status: 'SUCCESS',
          message: 'Thank you! Your purchase is successful!'
        }
      })
      return receipt;
    })
    .catch((error) => {
      this.setState({
        disabled: false,
        buyStatus: {
          status: 'ERROR',
          message: error.message
        }
      })
      return error;
    });
  }
  
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Asset Details</h2>
          </div>
          <div className="pure-u-1-1">
            <Link className="back-to-store" to={`/store/${this.props.params.storeId}`}><span className="chevron">&lt;</span>Back to store</Link>
            {this.state.assetDetails && (
              <AssetDetails 
                assetDetails={this.state.assetDetails}
                onClick={this.buyNow}
                disabled={this.state.disabled}
                buyStatus={this.state.buyStatus}
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
