import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { AccountData } from 'drizzle-react-components'
import CreateAsset from '../../components/marketplace/create-asset/CreateAsset'
import ActiveListings from '../../components/marketplace/active-listings/Active-Listings'
import SoldListings from '../../components/marketplace/sold-listings/Sold-Listings'

class Profile extends Component {
  constructor(props, context, { authData }) {
    super(props)
    authData = this.props
    this.contracts = context.drizzle.contracts;
    this.state = {
      hasStoreAccount: null,
      allAssets: []
    }
    console.log('CONTRACT - PROFILE PAGE', this.contracts)
  }

  componentDidMount() {
    // IMPORTANT: Check if admin.. if so redirect to /admin
    this.checkAdminRights();
    this.sellAssets();
    this.getAssets();
  }

  componentWillReceiveProps(nextProps, nextState) {
    // console.log('componentWillReceiveProps', nextProps.store.getState(), nextState.drizzle.store.getState())
  }

  checkAdminRights = async () => {
    const admin = await this.contracts.Marketplace.methods.admin().call();
    console.log('called admin again...', admin);
    if (admin && admin === this.props.accounts[0]) {
      console.log('is admin, go to /admin page')
      this.props.router.push('/admin');
    }
  }

  sellAssets = async () => {
    const res = await this.contracts.Marketplace.methods.store(this.props.accounts[0]).call().then((data) => {
      console.log('has store addr', data);
      const storeData = {
        approved: data.approved,
        balance: data.balance,
        name: data.name,
        owner: data.owner,
        storeId: data.storeId
      }
      if (data.owner === this.props.accounts[0]) {
        // show edit account details
        this.setState({
          hasStoreAccount: true,
          storeData
        })
      } else {
        // show apply for store application
        this.setState({
          hasStoreAccount: false,
          storeData
        })
      }

      return data;
    })
    .catch((error) => {
      return error;
    });
  }

  sendApplication = (e) => {
    e.preventDefault();
    console.log('send regi')
    // 

    // Declare this transaction to be observed. We'll receive the stackId for reference.
    const txId = this.contracts.Marketplace.methods.createStore(this.state.storeName).send()
      .then((data) => {
        console.log('data', data)
        return data;
      })
      .catch((error) => {
        console.log('error', error.message)
        return error;
      });

    if (txId.hasOwnProperty('transactionHash')) {
      this.sellAssets();
    }
    // const state = this.props.drizzle;
    // Use the dataKey to display the transaction status.
 
    // this.props.testAction(stackId);
    // console.log('STATE', this.props.store.getState())
    // if (state.transactionStack[stackId]) {
    //   const txHash = state.transactionStack[stackId]

    //   return state.transactions[txHash].status
    // }

    // let txHash = state.transactionStack[txId];                                                                                                                                                  
    // return txHash && state.transactions[txHash].status === 'success' 
  }

  storeNameUpdated = (e) => {
    // console.log('storeName updated', e.target.value, e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  }
  testSubmit = () => {
    console.log('test sub')
  }
  createItem = async (e) => {
    console.log('createItem', e)
    const { assetName, assetDescription, assetPrice, assetAddress } = e;
    const assetCreated = await this.contracts.Marketplace.methods.createAsset(assetName, assetAddress, assetDescription, assetPrice).send().then((data) => {
      console.log('assetCreated', data);
      // this.getAllAsset();
      return data;
    })
    .catch((error) => {
      return error;
    });


  }
  getAssets = async () => {
    const assetCount = await this.contracts.Marketplace.methods.assetIdCounter().call();
    let allAssets = [];
    for (let i = 0; i < assetCount; i++) {
      const data = await this.contracts.Marketplace.methods.asset(i).call();
      if (data.storeOwner === this.props.accounts[0]) {
        const store = {
          storeOwner: data.storeOwner,
          name: data.name,
          description: data.description,
          price: data.price,
          assetId: data.assetId,
          buyer: data.buyer,
          sold: data.sold
        };
        allAssets = [ ...allAssets, store ];
      }
    }
    this.setState({
      allAssets
    })
    console.log('thi.s', this.state)
  }
  testme = (e) => {
    console.log('TEST ME', e)
  }
  render() {
    const defaultTab = (this.state.hasStoreAccount) ? 0 : 1;
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Tabs className="tabs" defaultIndex={defaultTab}>
              <TabList className="tab-list">
                <Tab><h2>Your EthBay Account</h2></Tab>
                <Tab><h2>Sell Assets</h2></Tab>
                <Tab><h2>Bought Assets</h2></Tab>
              </TabList>

              <TabPanel>
                <h3>Your wallet details</h3>
                <AccountData accountIndex="0" units="ether" precision="3" />
                
                <hr />
                <h3>EthBay balance</h3>
                [withdraw from/to]
                <button type="button" onChange={this.save}>Withdraw funds</button>
              </TabPanel>
              <TabPanel>
                [check if address has a store... if so show sell section else... shoe registration form]
                [once registration submitted... show pending approval]
                {this.state.hasStoreAccount ? (
                  <div>
                    {this.state.storeData.approved ? (
                      <div>
                        <ActiveListings
                          allAssets={this.state.allAssets}
                        />
                        <hr />
                        <SoldListings
                          allAssets={this.state.allAssets}
                        />
                        <hr />
                        <CreateAsset 
                          onClick={this.createItem}
                        />
                      </div>
                    ) : (
                      <div>
                        <h3>Register</h3>
                        <p>Thank you for your application</p>
                        <p>Your application is pending approval</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <h3>Register</h3>
                    
                    <p>You do not have an account to sell. Please register to sell</p>
                    - store name 
                    {/* <ContractForm contract="Store" method="createStore" labels={['Enter your store name']} onClick={this.testSubmit} /> */}
                    - owner name/nickname <br />
                    <input type="text" name="storeName" onChange={this.storeNameUpdated} />
                    <button type="submit" onClick={this.sendApplication}>Register</button>
                  </div>
                )}
                
              </TabPanel>
              <TabPanel>
                <h2>My Items</h2>
                <p>List of assets bought - details of transaction etc for each</p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </main>
    )
  }
}

Profile.contextTypes = {
  drizzle: PropTypes.object,
  drizzleStore: PropTypes.object
};

export default Profile
