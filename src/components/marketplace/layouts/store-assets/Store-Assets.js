import React from  'react'
import { Link } from 'react-router'
import './store-assets.css'

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../../../../public/images', false, /\.(png|jpe?g|svg)$/));

const StoreAssets = ({...props}) => {
    // let imageCounter = 0;
    const displayStoresAssets = props.allAssets.map((item, i) => {
        // imageCounter++;
        // if (i === 17) {
        //     imageCounter = 0; // Reset counter... don't have that many images :)
        // }
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
        {displayStoresAssets}
    </div>
    )
}

export default StoreAssets