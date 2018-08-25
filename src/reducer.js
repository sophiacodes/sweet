import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'
import marketplaceReducer from '../src/pages/marketplace/marketplaceReducer'

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  marketplace: marketplaceReducer
})

export default reducer
