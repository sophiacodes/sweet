import Asset from './Asset'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
    ipfs: state.app.ipfs
  }
}

const AssetContainer = drizzleConnect(Asset, mapStateToProps);

export default AssetContainer
