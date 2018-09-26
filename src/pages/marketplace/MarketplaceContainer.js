import Marketplace from './Marketplace'
import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import { fetchAllStores } from '../../actions' 

const mapStateToProps = state => {
  return {
    allStores: state.marketplace.allStores
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ fetchAllStores }, dispatch)
  }
}

const MarketplaceContainer = drizzleConnect(Marketplace, mapStateToProps, mapDispatchToProps);

export default MarketplaceContainer
