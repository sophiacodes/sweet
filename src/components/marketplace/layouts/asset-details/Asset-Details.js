import React, { Component } from 'react';
import './asset-details.css';

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../../../../public/images', false, /\.(png|jpe?g|svg)$/));

class AssetDetails extends Component {
    buyNow = () => {
        this.props.onClick(this.props.assetDetails);
    }
    render() {
        const imageNo = this.props.assetDetails.assetId;
        return (
            <div className="asset-details-container">
                <div className="asset-image">
                    <img src={images[`copy-kitty0${imageNo}.svg`]} role="presentation" width="300" />
                </div>
                <div className="asset-details">
                    <h3 className="asset-name">{this.props.assetDetails.name}</h3>
                    <p className="asset-description">{this.props.assetDetails.description}</p>
    
                    <div className="buy-now-container">
                        <div className="asset-price">&Xi; <span className="price">{this.props.assetDetails.price}</span></div>
                        <div className="buy-now"><input type="button" value="Buy now" className="buy-now-button" onClick={this.buyNow} /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AssetDetails;