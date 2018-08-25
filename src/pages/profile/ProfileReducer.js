const initialState = {
    data: null
  }
  
  const profileReducer = (state = initialState, action) => {
    if (action.type === 'USER_LOGGED_IN' || action.type === 'USER_UPDATED')
    {
      return Object.assign({}, state, {
        data: action.payload
      })
    }
  
    if (action.type === 'USER_LOGGED_OUT')
    {
      return Object.assign({}, state, {
        data: null
      })
    }

    if (action.type === 'EXAMPLE')
    {
      return Object.assign({}, state, {
        EXAMPLE: 'HI THERE'
      })
    }
  
    return state
  }
  
  export default profileReducer