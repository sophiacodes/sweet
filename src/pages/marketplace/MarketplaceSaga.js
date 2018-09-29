import { put, takeLatest, call } from 'redux-saga/effects'

export function * fetchAllStoresAsync(contract) {
  try {
    let allStores = []
    const data = yield call(() => {
        return contract.marketplaceContract.methods.getAllStores().call()
      }
    )
    for (const storeAddress of data) {
      const store = yield call(() => {
          return contract.marketplaceContract.methods.store(storeAddress).call()
        }
      )
      const date = new Date(store.timestamp * 1000)
      const dateFormatted = store.timestamp === '0' ? '-' : date.toString()
      const storeDetails = {
        name: store.name,
        owner: store.owner,
        storeId: store.storeId,
        approved: store.approved,
        timestamp: dateFormatted
      }
      allStores = [ ...allStores, storeDetails ]
    }
    yield put({ type: 'ALL_STORES', payload: { allStores }})
  } catch (error) {
    console.log(error)
  }
}

function * marketplaceSaga() {
  yield takeLatest('FETCH_ALL_STORES', fetchAllStoresAsync)
}

export default marketplaceSaga
