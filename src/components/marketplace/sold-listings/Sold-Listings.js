import React, { Component } from 'react';

class SoldListings extends Component {
    componentWillMount() {
        const sold = this.activeAssets();
        this.setState({
            sold
        })
    }
    activeAssets = () => {
        /*
         storeOwner: data.storeOwner,
          name: data.name,
          description: data.description,
          price: data.price,
          assetId: data.assetId,
          buyer: data.buyer,
          sold: data.sold
        */
        // name, store id, decription, price, edit button, delete button, update button
        console.log('this.props.allAssets', this.props.allAssets)
        const sold = this.props.allAssets;
        const displayListings = sold.map((item, i) => {
            let t = '';
            if (item.sold) {
                t = <p key={`asset-{i}`}>{item.assetId}{item.name}{item.description}{item.price} {item.buyer}transactions dtails</p>
            }
            return (
                <div key={i}>
                    {t}
                </div>
            )
        })
        return displayListings;
    }
    render() {
        return (
            <div>
                <h3>Sold</h3>
                        <p>[List of Assets sold]</p>
                {this.state.sold ? (
                    <div>{this.state.sold}</div>
                ) : (
                    <p>[No items sold]</p>
                )}
            </div>
        )
    }
}

export default SoldListings;