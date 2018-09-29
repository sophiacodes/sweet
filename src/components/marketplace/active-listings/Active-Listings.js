import React, { Component } from 'react';
import Notification from '../../common/notification/Notification'
import './active-listings.css';

class ActiveListings extends Component {
    componentWillMount() {
        const active = this.activeAssets();
        this.setState({
            active
        })
    }

    activeAssets = () => {
        // name, store id, decription, price, edit button, delete button, update button
        if (typeof this.props.allAssets !== 'undefined') { 
            const onlyActive = this.props.allAssets.filter(asset => asset.sold === false);
            if (onlyActive.length > 0) {
                const displayListings = onlyActive.map((item, i) => {
                    let t = '';
                    if (!item.sold) {
                        t = <p key={`asset-{i}`} className="asset-item">
                                <span className="asset-id">{item.assetId}</span>
                                <span className="asset-name">{item.name}</span>
                                <span className="asset-description">{item.description}</span>
                                <span className="asset-price">{item.price}</span>
                                <span className="asset-buttons">edit / delete</span>
                            </p>
                        return (
                            <div key={i} className="asset-row">
                                {t}
                            </div>
                        )
                    }
                    return <div />;
                })
                return displayListings;
            }
        }
        return (
            <Notification>
                <p>You have no active assets for sell</p>
            </Notification>
        );
    }

    render() {
        return (
            <div className="active-listings">
                <h3>Active</h3>
                <div>{this.state.active}</div>
                <div>
                    <hr />

                </div>
            </div>
        )
    }
}

export default ActiveListings;
