import Profile from './Profile'
import { drizzleConnect } from 'drizzle-react'
import { bindActionCreators } from 'redux'
import { messageStatus } from '../../actions' 

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace,
    profileState: state.profile,
    utilState: state.util,
    ipfs: state.app.ipfs,
    app: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({ messageStatus }, dispatch),
    createAsset: (allAssets) => {dispatch({ type: 'CREATE_ASSET', allAssets })},
    hasAccount: (accountStatus) => {dispatch({ type: 'ACCOUNT_CREATION', accountStatus })},
    getSellerStore: (sellerStore) => {dispatch({ type: 'GET_SELLER_STORE', sellerStore }) },
    callInProgress: (progress) => { dispatch({ type: 'IN_PROGRESS', progress}) } 
  };
};

const ProfileContainer = drizzleConnect(Profile, mapStateToProps, mapDispatchToProps);

export default ProfileContainer
