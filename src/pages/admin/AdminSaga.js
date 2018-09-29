import { put, takeEvery, call } from 'redux-saga/effects'
import { messageStatus, fetchAllStores } from '../../actions'

export function * approveStore(processApplication) {
  const { marketplaceContract, storeAddress } = processApplication
  yield put(messageStatus({
      status: 'PENDING',
      message: 'Approval pending, please confirm the transaction in MetaMask'
    })
  )
  try {
    const data = yield call(() => {
        return marketplaceContract.methods.approveApplication(storeAddress).send()
      }
    )
    if (data.hasOwnProperty('transactionHash')) {
      yield put(messageStatus({
          status: 'SUCCESS',
          message: 'Approval successful'
        })
      )
      yield put(fetchAllStores(marketplaceContract))
    } else {
      yield put(messageStatus({
        status: 'ERROR',
        message: data.message
      }))
    }
  } catch (error) {
    yield put(messageStatus({
      status: 'ERROR',
      message: error.message
    }))
  }
}

function * adminSaga() {
  yield takeEvery('APPROVE_STORE', approveStore)
}

export default adminSaga
