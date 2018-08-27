import React, { Component } from 'react'
import './create-asset.css'

class CreateAsset extends Component {
    onChangeAssetDetails = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createItem = () => {
        const assetDetails = {
            assetName: this.state['asset-name'],
            assetDescription: this.state['asset-description'],
            assetPrice: this.state['asset-price'],
            assetAddress: this.state['asset-address']
        }
        this.props.onClick(assetDetails);
    }
    render() {
        return (
            <div className="create-asset-container">
                <h3>List an asset to sell</h3>
                <div className="create-asset">
                    <label htmlFor="asset-address">Asset contract address</label><br />
                    <input type="text" name="asset-address" onChange={this.onChangeAssetDetails} maxLength="42" />
                    <br /><br />
                    <label htmlFor="asset-name">Name</label><br />
                    <input type="text" name="asset-name" onChange={this.onChangeAssetDetails} maxLength="50" />
                    <br /><br />
                    <label htmlFor="asset-description">Description</label><br />
                    <textarea 
                        type="text" 
                        name="asset-description" 
                        onChange={this.onChangeAssetDetails} 
                        maxLength="250" 
                        rows="4" 
                        cols="50"
                    />
                    <br /><br />
                    <label htmlFor="asset-price">ETH</label><br />
                    <input type="number" name="asset-price" onChange={this.onChangeAssetDetails} />
                    <br />
                    <input 
                        type="button" 
                        className="button"
                        name="list-asset" 
                        value="Create item" 
                        disabled={this.props.disabled}
                        onClick={this.createItem} 
                    />
                </div>
            </div>
        )
    }
}

export default CreateAsset