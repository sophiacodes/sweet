import React, { Component } from 'react'
import './create-asset.css'

class CreateAsset extends Component {
    onChangeAssetDetails = (e) => {
        console.log(e.target.name, e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    createItem = () => {
        console.log(this.state)
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
            <div>
                <h3>List an asset to sell</h3>
                <div>
                    <label htmlFor="asset-address">Asset address (contract address)</label><br />
                    <input type="text" name="asset-address" onChange={this.onChangeAssetDetails} />
                    <br /><br />
                    <label htmlFor="asset-name">Name</label><br />
                    <input type="text" name="asset-name" onChange={this.onChangeAssetDetails} />
                    <br /><br />
                    <label htmlFor="asset-description">Description</label><br />
                    <input type="text" name="asset-description" onChange={this.onChangeAssetDetails} />
                    <br /><br />
                    <label htmlFor="asset-price">Ether</label><br />
                    <input type="number" name="asset-price" onChange={this.onChangeAssetDetails} />
                    <br />
                    <input type="button" name="list-asset" value="Create item" onClick={this.createItem} />
                </div>
            </div>
        )
    }
}

export default CreateAsset