// import { takeLatest } from 'redux-saga'
import { all, fork, takeEvery } from 'redux-saga/effects'
import { drizzleSagas } from 'drizzle'
// import * as actions from './actions'
import adminSaga from '../src/pages/admin/AdminActions'

// export function* helloSaga() {
//   console.log('Hello Saga!')
// }

// export function* watchApproveApplication() {
//   yield takeEvery('APPROVE_APPLICATION', AdminActions.approveApplication)
// }

// export function* watchGetAllStores() {
//   yield takeEvery('GET_ALL_STORES', AdminActions.getAllStores)
// }

export default function* root() {
  yield all([
    ...drizzleSagas.map(saga => fork(saga)),
    fork(adminSaga)
    // helloSaga(),
    // watchApproveApplication(),
    // watchGetAllStores()
  ])
}

// export function* handleTransaction(drizzle, fxn, ...args) {                                          
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