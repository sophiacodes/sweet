import { drizzleConnect } from 'drizzle-react'
import Admin from './Admin';
// import * as actions from './AdminActions'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => { console.log('----- ADMIN STATE', state)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace,
    marketplaceState: state.marketplace,
    adminState: state.admin
  }
}
// const mapDispatchToProps = (dispatch) => {
// 	console.log('mapDispatchToProps!')
// 	return {
// 		approve: () => {
// 			console.log('dispatching get APPROVE request')

// 			dispatch(actions.approve.success())
        // dispatch({type: "APPROVE"}, payload);
// 		},
// 	}
// }
const mapDispatchToProps = dispatch => {
  return {
    // approve: (id) => {console.log('WORK!!'); dispatch({ type: "APPROVE_APPLICATION", id })},
    getStores: (allStores) => {console.log('ALL STORES!!'); dispatch({ type: "GET_ALL_STORES", allStores })}
    // example: (test) => {console.log('TESTTTT', test); dispatch({type: "LAYOUT_ADD", payload: test})}
  }
}
// (fiatSymbol) => {console.log(dispatch); dispatch(actions.getEthRate(fiatSymbol));}
const AdminContainer = drizzleConnect(Admin, mapStateToProps, mapDispatchToProps);

export default AdminContainer
