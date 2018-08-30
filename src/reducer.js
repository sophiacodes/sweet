import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import marketplaceReducer from '../src/pages/marketplace/marketplaceReducer'
import storefrontReducer from '../src/pages/store/storefrontReducer'
import assetReducer from '../src/pages/asset/assetReducer'
import profileReducer from '../src/pages/profile/profileReducer'
import homeReducer from '../src/pages/home/homeReducer'
import utilReducer from '../src/util/utilReducer'
import appReducer from './AppReducer'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  marketplace: marketplaceReducer,
  home: homeReducer,
  asset: assetReducer,
  profile: profileReducer,
  storefront: storefrontReducer,
  util: utilReducer,
  app: appReducer
})

export default reducer
