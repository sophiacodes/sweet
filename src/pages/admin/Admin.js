import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notification from '../../../src/components/core/notification/Notification'
import MarketplaceApprovals from '../../../src/components/marketplace/marketplace-approvals/Marketplace-Approvals';
// import ContractBalance from '../../../src/components/marketplace/contract-balance/ContractBalance';

class Admin extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      storeArr: [],
      contractBalance: 0
    }
  }
// *** DETECT CHANGE WHEN WALLET ADDRESS CHANGES ***
  componentWillMount() {
    this.checkAdminRights();
  }
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps - nextProps', nextProps)
    this.setState({
      storeArr: nextProps.marketplaceState.allStores
    });
  }
  checkAdminRights = async () => {
    const admin = await this.contracts.Marketplace.methods.admin().call();
    if (admin && admin !== this.props.accounts[0]) {
      this.props.router.push('/profile');
    } else {
      // Get all stores for approval
      this.getAllStores();
      // this.getContractBalance();
    }
  }

  getAllStores = async () => {
    
    console.log(this.contracts)
    const getStores = await this.contracts.Marketplace.methods.getAllStores().call();

    console.log('** all stores...', getStores);
    let allStores = [];
    for (let i = 0; i < getStores.length; i++) {
      const data = await this.contracts.Marketplace.methods.store(getStores[i]).call();
      const store = {
        approved: data.approved,
        balance: data.balance,
        name: data.name,
        owner: data.owner,
        storeId: data.storeId
      };
      allStores = [ ...allStores, store ];
    }

    // Update to redux-store
    this.props.getStores(allStores);
  }

  getContractBalance = async () => {
    const contractBalance = await this.contracts.Marketplace.methods.getBalance().call();
    this.setState({
      contractBalance
    });
  }

  approveApplication = async (storeDetails) => {
    /*
    // JUST AN EXAMPLE
    let payload = {
      name: "my layout",
      pictures: 12,
      medium: { charcoal: "yes", paper: "60LBS" }
    };
    // Dispatch the saga action to add a new layout!
    // dispatch({type: "LAYOUT_ADD"}, payload);
    this.props.approve(payload); 
    */
      await this.contracts.Marketplace.methods.approveApplication(storeDetails[1]).send().then((data) => {
        this.getAllStores();
        return data;
      })
      .catch((error) => {
        return error;
      });
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Admin</h2>
            {this.state.storeArr.length === 0 ? (
              <Notification>
                <p><strong>No stores available</strong></p>
                <p>(When stores are created they will appear here for approval)</p>
              </Notification>
            ) : (
              <div>
                {/* <ContractBalance
                  balance={this.state.contractBalance}
                /> */}
                <MarketplaceApprovals
                  approveApplication={this.approveApplication} 
                  allStores={this.state.storeArr}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    )
  }
}

Admin.contextTypes = {
  drizzle: PropTypes.object
};

export default Admin
