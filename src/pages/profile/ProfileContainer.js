import Profile from './Profile'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {console.log('----- PROFILE STATE', state)
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace,
    profileState: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAsset: (allAssets) => {dispatch({ type: 'CREATE_ASSET', allAssets })},
    hasAccount: (accountStatus) => {dispatch({ type: 'ACCOUNT_CREATION', accountStatus })},
    getSellerStore: (sellerStore) => {dispatch({ type: 'GET_SELLER_STORE', sellerStore }) }
  };
};


const ProfileContainer = drizzleConnect(Profile, mapStateToProps, mapDispatchToProps);

export default ProfileContainer
