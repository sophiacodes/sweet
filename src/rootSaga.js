import { all, fork } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
import adminSaga from '../src/pages/admin/AdminSaga'
import profileSaga from '../src/pages/profile/ProfileSaga'
import homeSaga from '../src/pages/home/HomeSaga'
import marketplaceSaga from '../src/pages/marketplace/MarketplaceSaga'
import assetSaga from '../src/pages/asset/AssetSaga'
import storefrontSaga from '../src/pages/store/StorefrontSaga'
import utilSaga from '../src/util/utilSaga'
import appSaga from './AppSaga'

export default function* root() {
  yield all([
    ...drizzleSagas.map(saga => fork(saga)),
    fork(adminSaga),
    fork(profileSaga),
    fork(homeSaga),
    fork(marketplaceSaga),
    fork(assetSaga),
    fork(storefrontSaga),
    fork(utilSaga),
    fork(appSaga)
  ])
}

// export function * handleTransaction(drizzle, fxn, ...args) {                                          
//   let txId = yield call(fxn.cacheSend, ...args);                                                     
//   let txComplete = false;                                                                            
                                                                                                     
//   while (!txComplete) {                                                                              
//     // wait until something happens                                                                  
//     yield take(action =>                                                                             
//       action.type == 'TX_SUCCESSFUL' || action.type == 'TX_ERROR'                                    
//     )                                                                                                
                                                                                                     
//     //TODO: use a selector!                                                                          
//     let state = yield call(drizzle.store.getState)                                                   
                                                                                                     
//     let txHash = state.transactionStack[txId];                                                                                                                                                  
//     return txHash && state.transactions[txHash].status === 'success'                                                                                                 
// }