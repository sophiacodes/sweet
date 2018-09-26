export const messageStatus = (message) => ({ 
    type: 'UPDATE_MESSAGE', 
    message 
})
export const getStores = (allStores) => ({
    type: 'GET_ALL_STORES',
    allStores
})
export const fetchAllStores = (drizzle) => ({
    type: 'FETCH_ALL_STORES',
    drizzle
})