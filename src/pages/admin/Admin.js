import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Notification from '../../../src/components/core/notification/Notification'
import MarketplaceApprovals from '../../../src/components/marketplace/marketplace-approvals/Marketplace-Approvals';
import ContractBalance from '../../../src/components/marketplace/contract-balance/ContractBalance';

class Admin extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.state = {
      storeArr: [],
      contractBalance: 0
    }
    this.contractAddress = this.contracts.Marketplace.address;
    // this.test = context.TESTREDUCER
    // IMPORTANT: Check if admin.. if not redirect to /profile
  }
// *** DETECT CHANGE WHEN WALLET ADDRESS CHANGES ***
  componentWillMount() {
    // console.log('TESTREDUCER', this.test)
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
    console.log('called admin again...', admin);
    if (admin && admin !== this.props.accounts[0]) {
      console.log('is admin, go to /admin page')
      this.props.router.push('/profile');
    } else {
      // Get all stores for approval
      this.getAllStores();
      this.getContractBalance();
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

    console.log('storeArr', allStores);

    // Update to redux-store
    this.props.getStores(allStores);
    // if (admin && admin !== this.props.accounts[0]) {
    //   console.log('is admin, go to /admin page')
    //   this.props.router.push('/profile');
    // }
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
    const approvedStatus = await this.contracts.Marketplace.methods.approveApplication(storeDetails[1]).send().then((data) => {
        console.log('approvedStatus', data);
        this.getAllStores();
        return data;
      })
      .catch((error) => {
        return error;
      });
  }
  // checkAdminRights = async () => {
  //   const admin = await this.contracts.Admin.methods.admin().call().then((data) => {
  //     console.log('call admin addr', data);
  //     return data;
  //   })
  //   .catch((error) => {
  //     return error;
  //   });
  //   console.log( this.props.accounts[0])
  //   if (admin && admin !== this.props.accounts[0]) {
  //     this.props.router.push('/profile');
  //   } else {
  //     // Get number of stores
  //     const numOfStores = await this.contracts.Store.methods.storeIdCounter().call().then((data) => {
  //       console.log('numOfStores', data);
  //       return data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  //     console.log('numOfStores', numOfStores)
  //     // Get applications for approvel
  //   }
  // }

  withdrawFunds = async () => { 
    // console.log('WITHDRAW ETHER, to', this.state['receiver-address'], 'amount', this.state['withdrawal-amount'])
    // const receiver = this.state['receiver-address'];
    // const amount = parseFloat(this.state['withdrawal-amount']);

    console.log('************** WITHDRAW ****************')
    // const toWeiAssetPriceConversion = parseFloat(amount) * 1000000000000000000;
    // const contractAddress = await this.contracts.Marketplace.methods.admin().call();
    const sendParams = {
      from: this.contractAddress, // wrong not admin.. should be contract address 
      to: '0xa27233ee5d816552175dB350Ae913d12512A6334', //this.props.accounts[0], // receiver,
      gas: 3000000,
      value: 40000000000000000000 // 40 to test. toWeiAssetPriceConversion
    };
    console.log('************** START WITHDRAW ****************')
    await this.contracts.Marketplace.methods.withdrawFunds(sendParams.to, sendParams.value).send(sendParams)
    .then((receipt) => {
      console.log('RECEPIT: withdrawalStatus', receipt);
      // this.getAllStores();
      return receipt;
    })
    .catch((error) => {
      console.log('ERROR: withdrawalStatus', error);
      return error;
    });
    console.log('************** END WITHDRAW ****************')
  }
  render() {console.log('HI STORE', this.state)
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
                <ContractBalance
                  balance={this.state.contractBalance}
                />
                <MarketplaceApprovals
                  approveApplication={this.approveApplication} 
                  allStores={this.state.storeArr}
                />
                <h3>Withdrawal requests</h3>
                <input type="button" value="Withdraw" onClick={this.withdrawFunds} />
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
