import React from  'react'
import { Link } from 'react-router'
import Notification from '../../core/notification/Notification'
import './store-assets.css'

const importAll = (r) => {
    let images = {}; // eslint-disable-next-line
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../../../public/images', false, /\.(png|jpe?g|svg)$/));

const StoreAssets = ({...props}) => {

    const displayStoresAssets = props.allAssets.map((item, i) => {
        return (
          <div key={i} className="store-asset">
            <Link to={`/asset/${item.storeOwner}/${item.assetId}`}>
              <img src={images[`copy-kitty0${item.assetId}.svg`]} role="presentation" />
              <h3 className="asset-name">{item.name}</h3>
            </Link>
          </div>
        )
    })
    return (
    <div className="store-assets">
        {props.allAssets.length !== 0 ? (
            <div>{displayStoresAssets}</div>
        ) : (
            <Notification>
                <p>There are no assets in the store.</p>
            </Notification>
        )}
    </div>
    )
}

export default StoreAssets