const marketplaceReducer = (state = {}, action) => {
    let newState = state;
    switch (action.type) {
      case 'ALL_STORES':
        newState = { ...state, ...action.payload };
        break;
      default: 
        break;
    }
    return newState;
}

export default marketplaceReducer;