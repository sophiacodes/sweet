import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import Admin from './Admin'
import { messageStatus, fetchAllStores } from '../../actions' 

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    // accounts: state.accounts,
    // drizzleStatus: state.drizzleStatus,
    // Marketplace: state.contracts.Marketplace,
    // marketplaceState: state.marketplace,
    // adminState: state.admin,
    message: state.app.messageStatus,
    allStores: state.marketplace.allStores
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchAllStores, messageStatus }, dispatch)
});

const AdminContainer = drizzleConnect(Admin, mapStateToProps, mapDispatchToProps);

export default AdminContainer
