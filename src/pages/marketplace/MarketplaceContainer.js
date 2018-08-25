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

const MarketplaceContainer = drizzleConnect(Marketplace, mapStateToProps);

export default MarketplaceContainer
