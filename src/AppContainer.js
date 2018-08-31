import App from './App'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps, mapDispatchToProps);

export default AppContainer
