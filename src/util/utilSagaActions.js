import { put, takeLatest } from 'redux-saga/effects'

export function * callInProgress(inProgress) {
    yield put({ type: 'CALL_IN_PROGRESS', payload: inProgress })
}

function * utilSaga() {
    yield takeLatest('IN_PROGRESS', callInProgress)
}

export default utilSaga