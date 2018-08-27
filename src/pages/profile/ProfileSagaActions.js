import { put, takeLatest } from 'redux-saga/effects'

export function * getSellerStore(sellerStore) {
    yield put({ type: 'SELLER_STORE', payload: sellerStore });
    // yield takeLatest('GET_SELLER_STORE', getSellerStore)
}

export function * accountCreated(accountStatus) {
    yield put({ type: 'ACCOUNT_CREATED', payload: accountStatus })
}

export function * createAsset(allAssets) {
    yield put({ type: 'ASSET_CREATED', payload: allAssets })
}

function * profileSaga() {
    yield takeLatest('CREATE_ASSET', createAsset)
    yield takeLatest('GET_SELLER_STORE', getSellerStore)
    yield takeLatest('ACCOUNT_CREATION', accountCreated)
}

export default profileSaga