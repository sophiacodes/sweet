import { drizzleConnect } from 'drizzle-react'
import Admin from './Admin';

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

const mapDispatchToProps = dispatch => {
  return {
    // approve: (id) => { dispatch({ type: "APPROVE_APPLICATION", id })},
    getStores: (allStores) => { dispatch({ type: "GET_ALL_STORES", allStores })}
  }
}

const AdminContainer = drizzleConnect(Admin, mapStateToProps, mapDispatchToProps);

export default AdminContainer
