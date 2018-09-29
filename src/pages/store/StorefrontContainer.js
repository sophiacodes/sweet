import Storefront from './Storefront'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    Marketplace: state.contracts.Marketplace
  }
}

const StorefrontContainer = drizzleConnect(Storefront, mapStateToProps);

export default StorefrontContainer
