import { put } from 'redux-saga/effects'

const IPFS = require('ipfs-api')
const ipfs = new IPFS({ host: 'localhost', port: 5001, protocol: 'http' })

function * appSaga() {
    yield put({ type: 'IPFS', payload: { ipfs } })
}

export default appSaga