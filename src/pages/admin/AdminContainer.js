import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import Admin from './Admin'
import { messageStatus, fetchAllStores, approveStore } from '../../actions' 

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    message: state.app.messageStatus,
    allStores: state.marketplace.allStores
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchAllStores, messageStatus, approveStore }, dispatch)
});

const AdminContainer = drizzleConnect(Admin, mapStateToProps, mapDispatchToProps);

export default AdminContainer
