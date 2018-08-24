import Marketplace from './../build/contracts/Marketplace.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  contracts: [
    Marketplace
  ],
  events: {
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions