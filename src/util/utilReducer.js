const utilReducer = (state = { callInProgress: false }, action) => {
    let newState = state;
    switch (action.type) {
      case 'CALL_IN_PROGRESS': 
        newState = { ...state, ...action.payload };
        break;
      default: 
        break;
    }
    return newState;
}

export default utilReducer;