import React from  'react'
import { Link } from 'react-router'
import './featured-stores.css'

const importAll = (r) => {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../../../../public/images', false, /\.(png|jpe?g|svg)$/));

const FeaturedStores = ({...props}) => {
    let imageCounter = 0;
    const displayFeaturedStores = props.allStores.map((item, i) => {
        imageCounter++;
        if (i === 17) {
            imageCounter = 0; // Reset counter... don't have that many images :)
        }
        return (
          <div key={i} className="featured-store">
            <Link to={`/store/${item.owner}`}>
              <img src={images[`copy-kitty0${imageCounter}.svg`]} role="presentation" />
              <h3 className="feature-store-name">{item.name}</h3>
            </Link>
          </div>
        )
    })
    return (
    <div className="featured-stores">
        {displayFeaturedStores}
    </div>
    )
}

export default FeaturedStores