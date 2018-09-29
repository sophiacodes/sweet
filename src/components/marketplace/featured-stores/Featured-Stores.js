import React from  'react'
import { Link } from 'react-router'
import Notification from '../../common/notification/Notification'
import './featured-stores.css'

const importAll = (r) => {
    let images = {}; // eslint-disable-next-line
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
  
const images = importAll(require.context('../../../../public/images', false, /\.(png|jpe?g|svg)$/));

const FeaturedStores = ({...props}) => {
    let displayCounter = 0;
    const onlyApproved = props.allStores.filter(store => store.approved === true);
    const displayFeaturedStores = onlyApproved.map((item, i) => {
        displayCounter++;
        if (i === 17) {
            displayCounter = 0; // Reset counter... don't have that many images :)
        }
        return (
          <div key={i} className="featured-store">
            <Link to={`/store/${item.owner}`}>
              <img src={images[`copy-kitty0${displayCounter}.svg`]} role="presentation" />
              <h3 className="feature-store-name">{item.name}</h3>
            </Link>
          </div>
        )
    })
    return (
    <div className="featured-stores">
        {displayCounter !== 0 ? (
            <div>{displayFeaturedStores}</div>
        ) : (
            <Notification>
                <p>There are no stores in the marketplace.</p>
                <p>Create a new store in 'My Account' to get started.</p>
            </Notification>
        )}
    </div>
    )
}

export default FeaturedStores
