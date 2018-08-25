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
    approve: (id) => {console.log('WORK!!'); dispatch({ type: "APPROVE_APPLICATION", id })},
    getStores: (allStores) => {console.log('ALL STORES!!'); dispatch({ type: "GET_ALL_STORES", allStores })}
    // example: (test) => {console.log('TESTTTT', test); dispatch({type: "LAYOUT_ADD", payload: test})}
  }
}

const MarketplaceContainer = drizzleConnect(Marketplace, mapStateToProps, mapDispatchToProps);

export default MarketplaceContainer
