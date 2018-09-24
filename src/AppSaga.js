import { put, takeLatest } from 'redux-saga/effects'

const IPFS = require('ipfs-api')
const ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' })

export function * updateMessage(message) {console.log('test', message)
    yield put({ type: 'MESSAGE', payload: { messageStatus: message.message } })
}

function * appSaga() {
    yield put({ type: 'IPFS', payload: { ipfs } })
    yield takeLatest('UPDATE_MESSAGE', updateMessage)
}

export default appSaga