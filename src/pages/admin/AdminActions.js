// import { delay } from 'redux-saga'
import { put, takeEvery, takeLatest } from 'redux-saga/effects'

export function * approveApplication(id) {
    console.log('CALLED ACTION - approveApplication', id)
    yield put({type: 'APPROVE', payload: id})
    yield takeLatest('GET_ALL_STORES', getAllStores)
}

export function * getAllStores(allStores) {
    console.log('CALLED ACTION - getAllStores', allStores)
    yield put({type: 'ALL_STORES', payload: allStores})
}

// export function * watchApproveApplication() {
//     yield takeEvery('APPROVE_APPLICATION', approveApplication)
//   }
  
//   export function * watchGetAllStores() {
//     yield takeEvery('GET_ALL_STORES', getAllStores)
//   }

  function * adminSaga() {
    yield takeLatest('APPROVE_APPLICATION', approveApplication)
    yield takeLatest('GET_ALL_STORES', getAllStores)
  }

  export default adminSaga