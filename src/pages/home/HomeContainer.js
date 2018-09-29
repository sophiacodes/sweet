import Home from './Home'
import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import { fetchAllStores } from '../../actions' 

// May still need this even with data function to refresh component on updates for this contract.
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

const HomeContainer = drizzleConnect(Home, mapStateToProps, mapDispatchToProps);

export default HomeContainer
