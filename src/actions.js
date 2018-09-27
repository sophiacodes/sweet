export const messageStatus = (message) => ({ 
  type: 'UPDATE_MESSAGE', 
  message 
})
export const getStores = (allStores) => ({
  type: 'GET_ALL_STORES',
  allStores
})
export const fetchAllStores = (contract) => ({
  type: 'FETCH_ALL_STORES',
  marketplaceContract: contract.Marketplace || contract
})
export const approveStore = (processApproval) => ({
  type: 'APPROVE_STORE',
  marketplaceContract: processApproval.Marketplace,
  storeAddress: processApproval.owner
})
