import React, { Component } from 'react';
import Notification from '../../core/notification/Notification'

class SoldListings extends Component {
    componentWillMount() {
        const sold = this.soldAssets();
        this.setState({
            sold
        })
    }
    soldAssets = () => {
        // name, store id, decription, price, edit button, delete button, update button
        if (typeof this.props.allAssets !== 'undefined') { 
            const onlySold = this.props.allAssets.filter(asset => asset.sold === true);
            if (onlySold.length > 0) {
                const displayListings = onlySold.map((item, i) => {
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
        }
        return (
            <Notification>
                <p>You have no sold assets</p>
            </Notification>
        );
    }
    render() {
        return (
            <div>
                <h3>Sold</h3>
                {this.state.sold}
            </div>
        )
    }
}

export default SoldListings;