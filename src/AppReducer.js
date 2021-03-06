const appReducer = (state = {}, action) => {
    let newState = state;
    switch (action.type) {
      case 'IPFS': 
      case 'MESSAGE': {
        newState = { ...state, ...action.payload };
        break;
      }
      default: 
        break;
    }
    return newState;
  }
  
  export default appReducer;