import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notification from '../../../src/components/core/notification/Notification'
import MarketplaceApprovals from '../../../src/components/marketplace/marketplace-approvals/Marketplace-Approvals';

class Admin extends Component {
  constructor(props, context) {
    super(props)
    this.contracts = context.drizzle.contracts;
    this.state = {
      storeArr: [],
      contractBalance: 0,
      approvalStatus: {}
    }
  }

  // *** TODO: DETECT CHANGE WHEN WALLET ADDRESS CHANGES ***

  componentWillMount() {
    this.checkAdminRights();
  }

  componentWillReceiveProps(nextProps) {
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
    }
  }

  getAllStores = async () => {
    const getStores = await this.contracts.Marketplace.methods.getAllStores().call();
    let allStores = [];
    for (let i = 0; i < getStores.length; i++) {
      const data = await this.contracts.Marketplace.methods.store(getStores[i]).call();
      const date = new Date(data.timestamp * 1000);
      const dateFormatted = data.timestamp === '0' ? '-' : date.toString();
      const store = {
        approved: data.approved,
        name: data.name,
        owner: data.owner,
        storeId: data.storeId,
        timestamp: dateFormatted
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
    this.setState({
      disableApproval: true,
      approvalStatus: {
        status: 'PENDING',
        message: 'Approval pending, please confirm the transaction in MetaMask'
      }
    })
    await this.contracts.Marketplace.methods.approveApplication(storeDetails.owner).send()
    .then((data) => {
      const approvedStore = {approved: true, name: storeDetails.name, owner: storeDetails.owner, storeId: storeDetails.storeId};
      const addStore = [...this.state.storeArr, approvedStore];
      this.props.getStores(addStore);
      this.setState({
        disableApproval: false,
        approvalStatus: {
          status: 'SUCCESS',
          message: 'Approval successful'
        }
      })
      return data;
    })
    .then((result) => {
      this.getAllStores();
      return result;
    })
    .catch((error) => {
      this.setState({
        disableApproval: false,
        approvalStatus: {
          status: 'ERROR',
          message: error.message
        }
      })
      return error;
    });
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h2 className="page-title">Admin</h2>
            {(typeof this.state.storeArr !== 'undefined' && this.state.storeArr.length === 0) ? (
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
                  disableApproval={this.state.disableApproval}
                  approvalStatus={this.state.approvalStatus}
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
