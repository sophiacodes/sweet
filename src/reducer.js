import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { drizzleReducers } from 'drizzle'

const marketplaceReducer = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case 'ALL_STORES':
    case 'APPROVE': 
      newState = { ...state, ...action.payload };
      break;
    default: 
      break;
  }
  return newState;
}

const reducer = combineReducers({
  routing: routerReducer,
  ...drizzleReducers,
  marketplace: marketplaceReducer
})

export default reducer
