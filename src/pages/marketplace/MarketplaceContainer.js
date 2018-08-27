import Marketplace from './Marketplace'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    approve: (id) => { dispatch({ type: "APPROVE_APPLICATION", id })},
    getStores: (allStores) => { dispatch({ type: "GET_ALL_STORES", allStores })}
  }
}

const MarketplaceContainer = drizzleConnect(Marketplace, mapStateToProps, mapDispatchToProps);

export default MarketplaceContainer
