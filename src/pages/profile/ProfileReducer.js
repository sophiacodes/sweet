const profileReducer = (state = {}, action) => {
  let newState = state;
  switch (action.type) {
    case 'SELLER_STORE':
    case 'ACCOUNT_CREATED':
    case 'ASSET_CREATED':
      newState = { ...state, ...action.payload };
      break;
    default: 
      break;
  }
  return newState;
}

export default profileReducer;