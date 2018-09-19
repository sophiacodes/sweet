import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import Admin from './Admin'
import { getStores } from './AdminActions'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace,
    marketplaceState: state.marketplace,
    adminState: state.admin
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ getStores }, dispatch)
});

const AdminContainer = drizzleConnect(Admin, mapStateToProps, mapDispatchToProps);

export default AdminContainer
