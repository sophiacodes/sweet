import React, { Component } from 'react';

class ActiveListings extends Component {
    componentWillMount() {
        const active = this.activeAssets();
        this.setState({
            active
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
        const active = this.props.allAssets;
        const displayListings = active.map((item, i) => {
            let t = '';
            if (!item.sold) {
                t = <p key={`asset-{i}`}>{item.assetId}{item.name}{item.description}{item.price} edit/delete/save</p>
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
                <h3>Active</h3>
                {this.state.active ? (
                    <div>{this.state.active}</div>
                ) : (
                    <p>[You have no active assets for sell]</p>
                )}
            </div>
        )
    }
}

export default ActiveListings;