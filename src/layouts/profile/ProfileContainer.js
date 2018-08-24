import Profile from './Profile'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace
    // Admin: state.contracts.Admin
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
};


const ProfileContainer = drizzleConnect(Profile, mapStateToProps, mapDispatchToProps);

export default ProfileContainer
